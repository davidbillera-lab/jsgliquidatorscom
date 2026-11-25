export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_profile_checks: {
        Row: {
          evidence: string
          last_checked_at: string
          profile_name: string
          status: string
        }
        Insert: {
          evidence?: string
          last_checked_at: string
          profile_name: string
          status: string
        }
        Update: {
          evidence?: string
          last_checked_at?: string
          profile_name?: string
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      walkthrough_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          notes: string
          phone: string
          preferred_date: string
          preferred_time_window: string
          property_address: string
          property_city: string
          service_interest: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string
          phone?: string
          preferred_date: string
          preferred_time_window: string
          property_address?: string
          property_city?: string
          service_interest?: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string
          phone?: string
          preferred_date?: string
          preferred_time_window?: string
          property_address?: string
          property_city?: string
          service_interest?: string
          status?: string
        }
        Relationships: []
      }
      whatsapp_bookings: {
        Row: {
          address: string | null
          conversation_id: string | null
          created_at: string
          customer_name: string | null
          ends_at: string
          id: string
          notes: string | null
          phone: string
          service: string
          starts_at: string
          status: string
        }
        Insert: {
          address?: string | null
          conversation_id?: string | null
          created_at?: string
          customer_name?: string | null
          ends_at: string
          id?: string
          notes?: string | null
          phone: string
          service?: string
          starts_at: string
          status?: string
        }
        Update: {
          address?: string | null
          conversation_id?: string | null
          created_at?: string
          customer_name?: string | null
          ends_at?: string
          id?: string
          notes?: string | null
          phone?: string
          service?: string
          starts_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_bookings_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_conversations: {
        Row: {
          created_at: string
          customer_name: string | null
          handed_off: boolean
          handoff_reason: string | null
          id: string
          last_inbound_message_id: string | null
          last_message_at: string | null
          messages: Json
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_name?: string | null
          handed_off?: boolean
          handoff_reason?: string | null
          id?: string
          last_inbound_message_id?: string | null
          last_message_at?: string | null
          messages?: Json
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_name?: string | null
          handed_off?: boolean
          handoff_reason?: string | null
          id?: string
          last_inbound_message_id?: string | null
          last_message_at?: string | null
          messages?: Json
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_webhook_events: {
        Row: {
          attempts: number
          delivery_id: string
          event: string
          id: string
          payload: Json
          processed_at: string | null
          processing_error: string | null
          received_at: string
        }
        Insert: {
          attempts?: number
          delivery_id: string
          event: string
          id?: string
          payload: Json
          processed_at?: string | null
          processing_error?: string | null
          received_at?: string
        }
        Update: {
          attempts?: number
          delivery_id?: string
          event?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          processing_error?: string | null
          received_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auto_publish_scheduled_posts: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
