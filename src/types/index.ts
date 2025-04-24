// Base interface for common properties
export interface BaseComponent {
  component_id: string;
  component_name: string;
  is_subcomponent: boolean;
  updated_at: string; // ISO date string
  created_at: string; // ISO date string
  has_subcomponent: boolean;
  hsn_code: string;
  sku_code: string;
}

// Subcomponent specific properties
export interface Subcomponent extends BaseComponent {
  parent_component_id: string; // Override to make it required
  usable_quantity: number;
  damaged_quantity: number;
  discarded_quantity: number;
  last_updated: string; // ISO date string
  total_quantity: number;
}

// InventoryItem specific properties
export interface InventoryItem extends BaseComponent {
  parent_component_id: null;
  subcomponents: Subcomponent[];
  [key: string]: any;
}
