import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, EyeOff, Upload, Save, LogOut, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const BlogAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "Penny",
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        setTimeout(async () => {
          const { data: roles } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", session.user.id)
            .eq("role", "admin")
            .single();

          setIsAdmin(!!roles);
          setAuthLoading(false);

          if (!roles) {
            toast.error("You don't have admin access");
            navigate("/admin-auth");
          }
        }, 0);
      } else {
        setIsAdmin(false);
        setAuthLoading(false);
        navigate("/admin-auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .single()
          .then(({ data: roles }) => {
            setIsAdmin(!!roles);
            setAuthLoading(false);

            if (!roles) {
              navigate("/admin-auth");
            }
          });
      } else {
        setAuthLoading(false);
        navigate("/admin-auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-auth");
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePost = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-blog-post", {
        body: {},
      });

      if (error) throw error;

      if (data?.success) {
        toast.success(`Draft created: "${data.post.title}"`);
        queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      } else {
        throw new Error(data?.error || "Failed to generate post");
      }
    } catch (error) {
      console.error("Error generating post:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate post";
      toast.error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("blog-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData & { featured_image_url?: string }) => {
      const { error } = await supabase.from("blog_posts").insert({
        title: data.title,
        slug: data.slug || generateSlug(data.title),
        excerpt: data.excerpt || null,
        content: data.content,
        author: data.author || "Penny",
        published: data.published,
        published_at: data.published ? new Date().toISOString() : null,
        featured_image_url: data.featured_image_url || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Blog post created!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to create post: " + error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData & { id: string; featured_image_url?: string }) => {
      const updateData: Record<string, unknown> = {
        title: data.title,
        slug: data.slug || generateSlug(data.title),
        excerpt: data.excerpt || null,
        content: data.content,
        author: data.author || "Penny",
        published: data.published,
      };

      if (data.published && !editingPost?.published) {
        updateData.published_at = new Date().toISOString();
      }

      if (data.featured_image_url) {
        updateData.featured_image_url = data.featured_image_url;
      }

      const { error } = await supabase
        .from("blog_posts")
        .update(updateData)
        .eq("id", data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Blog post updated!");
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to update post: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Blog post deleted!");
    },
    onError: (error) => {
      toast.error("Failed to delete post: " + error.message);
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, published }: { id: string; published: boolean }) => {
      const { error } = await supabase
        .from("blog_posts")
        .update({
          published,
          published_at: published ? new Date().toISOString() : null,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Post status updated!");
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Penny",
      published: false,
    });
    setEditingPost(null);
    setImageFile(null);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      author: post.author || "Penny",
      published: post.published || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (editingPost) {
        updateMutation.mutate({
          ...formData,
          id: editingPost.id,
          featured_image_url: imageUrl,
        });
      } else {
        createMutation.mutate({
          ...formData,
          featured_image_url: imageUrl,
        });
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <SEOHead title="Blog Admin" description="Manage blog posts" canonical="/blog-admin" />
        <section className="pt-32 pb-20 bg-background min-h-screen">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <SEOHead
        title="Blog Admin"
        description="Manage blog posts"
        canonical="/blog-admin"
      />

      <section className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  Blog Admin
                </h1>
                <p className="text-muted-foreground mt-2">
                  Logged in as {user?.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="secondary" 
                  onClick={handleGeneratePost}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? "Generating..." : "AI Generate"}
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPost ? "Edit Post" : "Create New Post"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug">
                        URL Slug (auto-generated if empty)
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        placeholder={generateSlug(formData.title)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) =>
                          setFormData({ ...formData, author: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Featured Image</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                      />
                      {editingPost?.featured_image_url && !imageFile && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Current image will be kept if no new image is selected
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="excerpt">Excerpt (short summary)</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="content">
                        Content (HTML supported)
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        rows={10}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, published: checked })
                        }
                      />
                      <Label htmlFor="published">Publish immediately</Label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={uploading || createMutation.isPending || updateMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {uploading ? "Uploading..." : editingPost ? "Update Post" : "Create Post"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Title
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Author
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                          Created
                        </th>
                        <th className="text-right px-6 py-4 text-sm font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-muted/30">
                          <td className="px-6 py-4">
                            <div className="font-medium text-foreground">
                              {post.title}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              /blog/{post.slug}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {post.author}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                togglePublishMutation.mutate({
                                  id: post.id,
                                  published: !post.published,
                                })
                              }
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                post.published
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {post.published ? (
                                <>
                                  <Eye className="w-3 h-3" /> Published
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3" /> Draft
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 text-muted-foreground text-sm">
                            {format(new Date(post.created_at), "MMM d, yyyy")}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(post)}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Post?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete "{post.title}". This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteMutation.mutate(post.id)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground mb-4">
                  No blog posts yet. Create your first one!
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogAdmin;
