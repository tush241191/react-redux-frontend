export interface MultiSelectOptionItem {
  label: string;
  value: string;
}

export interface MultiSelectOption {
  label?: string;
  value?: string;
  options: MultiSelectOptionItem[];
}

export interface SelectedMultiSelectOption {
  label: string;
  value: string;
  category: string;
}
