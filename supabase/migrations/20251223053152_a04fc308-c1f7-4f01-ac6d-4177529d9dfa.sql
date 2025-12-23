-- Fix user_roles RLS - prevent public exposure
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Drop and recreate storage policies with admin auth requirement
DROP POLICY IF EXISTS "Allow blog image uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow blog image updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow blog image deletes" ON storage.objects;

-- Authenticated admins can upload blog images
CREATE POLICY "Admins can upload blog images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Authenticated admins can update blog images
CREATE POLICY "Admins can update blog images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);

-- Authenticated admins can delete blog images
CREATE POLICY "Admins can delete blog images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images' AND
  public.has_role(auth.uid(), 'admin')
);