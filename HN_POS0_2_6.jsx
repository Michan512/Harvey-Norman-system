import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  LogOut,
  User2,
  UserRound,
  KeyRound,
  Eye,
  EyeOff,
  X,
  Search,
  GripHorizontal,
  ClipboardList,
  ShoppingCart,
  BarChart3,
  Star,
  FileText,
  CalendarDays,
  ChevronRight,
  Calendar,
  Package,
  PackageCheck,
  Truck,
  Boxes,
  Tag,
  Tags,
  Receipt,
  Wrench,
  ShieldCheck,
  Ticket,
  ClipboardCheck,
  LayoutGrid,
  Users,
  Store,
  Building2,
  Target,
  Coins,
  Banknote,
  CreditCard,
  Percent,
  Undo2,
  RotateCcw,
  ListChecks,
  ListOrdered,
  History,
  Power,
  PowerOff,
  Monitor,
  Settings2,
  ScanBarcode,
  MailPlus,
  FileSpreadsheet,
  FolderClock,
  Gift,
  HeartHandshake,
  GitMerge,
  ShoppingBag,
  Calculator,
  LockKeyhole,
  Moon,
  Sun,
  StickyNote,
  SquarePen,
} from 'lucide-react';

/* ----- Custom line icons (lucide style: 24 viewBox, round caps) ----- */
function CashRegisterIcon({ size = 18, strokeWidth = 1.75, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"
      strokeLinejoin="round" {...rest}>
      <path d="M4 21h16" />
      <rect x="3" y="13" width="18" height="8" rx="1.5" />
      <path d="M6 13V9h12v4" />
      <rect x="8" y="4" width="8" height="5" rx="1" />
      <path d="M7 17h2M11 17h2M15 17h2" />
    </svg>
  );
}

function DotGridIcon({ size = 18, strokeWidth = 1.75, ...rest }) {
  const cx = [6, 12, 18];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      stroke="none" {...rest}>
      {cx.map((y) => cx.map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" />))}
    </svg>
  );
}

// ─── Product Groups tree ─────────────────────────────────────────────────────
// Three levels: department → section → category.
// Used by the Alt+G Product Groups dialog so operators can browse unfamiliar
// products without knowing a product code or keyword.
const PRODUCT_GROUPS = [
  {
    key: '1', label: 'Health, Fitness & Sport',
    sections: [
      { label: 'Connected Nursery', categories: ['Activity Trackers', 'Baby Monitors', 'Soothers'] },
      { label: 'Connected Fitness & Health', categories: ['Connected Fitness', 'Health Management', 'Personal Monitoring', 'Connected Pet', 'Sleep & Stress Management', 'Weight Management'] },
      { label: 'Connected Kids', categories: ['Age Group 5–12'] },
      { label: 'Services', categories: ['Allowances', 'Bonus Gift Card Adjustment', 'Gift Vouchers', 'Installation & Training', 'Miscellaneous', 'Recovery Costs', 'Services', 'Support', 'Warranty'] },
    ],
  },
  {
    key: '2', label: 'Gardening',
    sections: [
      { label: 'Hardware', categories: [] },
      { label: 'Promotion', categories: ['Charity', 'Cash Back', 'Promotion'] },
      { label: 'Services', categories: ['Adjustment', 'Allowance', 'Bonus Gift Cards Adjustment', 'Extended Warranty', 'Gift Vouchers', 'Installation', 'Miscellaneous', 'Non Rebatable', 'Recovery Costs', 'Services'] },
    ],
  },
  {
    key: '3', label: 'Electrical',
    sections: [
      { label: 'Bedding Accessories', categories: [] },
      { label: 'Agent Commission Sales', categories: [] },
      { label: 'Audio', categories: ['Home Theatre', 'Music'] },
      { label: 'CTV', categories: ['LED / LCD', 'OLED', 'Projectors'] },
      { label: 'Entertainment Furniture', categories: ['TV Cabinets', 'Audio Cabinets & Stands'] },
      { label: 'Miscellaneous', categories: [] },
      { label: 'Mobile Communications', categories: [
        'Mobile Bonuses',
        'Broadband',
        'Mobile Connections',
        'Mobile Data Cards',
        'Mobile Handsets',
        'Mobile Network Devices',
        'Mobile Subsidies',
        'Phablets',
        'Mobile Plans',
        'Pocket PCs',
        'Postpaid Mobiles',
        'Prepaid',
        'Mobile Refresh',
        'SIM',
        'Tablets',
        'Trade In',
        'Watch',
      ]},
      { label: 'Promotion', categories: ['Promotion', 'Charity', 'Cash Back'] },
      { label: 'Service', categories: [
        'Adjustable Allowance',
        'Bonus Gift Card Adjustment',
        'Product Care',
        'Foxtel',
        'Gift Vouchers',
        'Installation',
        'Miscellaneous',
        'Non Rebatable',
        'Non Rebatable Product Care',
        'Recovery',
        'Services',
      ]},
      { label: 'Essentials', categories: [
        'Audio & Visual Brackets',
        'Batteries',
        'Connectivity',
        'Maintenance',
        'Essential Others',
        'Projector Screens & Globes',
        'Power & Surge Protectors',
        'Remote Control',
        'Signals',
      ]},
      { label: 'Video', categories: [
        'Blu Ray',
        'Blu Ray / DVD',
        'DVD',
        'Media Players',
        'Personal Video Recorder',
        'Set Top Box',
      ]},
    ],
  },
  {
    key: '4', label: 'Small Appliances',
    sections: [
      { label: 'Air Treatment', categories: [
        'Air Purifiers',
        'Aroma Diffuser',
        'Dehumidifiers',
        'Humidifiers',
      ]},
      { label: 'Coffee', categories: [
        'Coffee Accessories',
        'Coffee Grinders',
        'Coffee Machines Automatic',
        'Coffee Machines Capsule',
        'Coffee Machines Manual',
        'Coffee Machines Auto Manual',
        'Coffee Makers',
        'Dripolators / Iced Coffee Makers',
        'Milk Frothers',
      ]},
      { label: 'Fans', categories: [
        'Fan Accessory',
        'Air Circulators',
        'Box Fans',
        'Ceiling Fans',
        'Desk Fans',
        'Evaporative Coolers',
        'Floor Fans',
        'Misting Fan',
        'Pedestal Fans',
        'Personal Fans',
        'Tower Fans',
        'Wall Fans',
      ]},
      { label: 'Heaters', categories: [
        'Heater Accessories',
        'Electric Blankets & Personal Heaters',
        'Ceramic & Fan Heaters',
        'Column Heaters',
        'Electric Fire Heaters',
        'Gas Heaters',
        'Panel & Convector Heaters',
        'Radiant Heaters',
        'Towel Rail',
      ]},
      { label: 'Microwave Ovens', categories: [
        'Microwave Accessories',
        'Convection MWO',
        'Electronic MWO',
        'Grill MWO',
        'In-Built MWO',
        'Microwave Oven Trim Kits',
        'Mechanical MWO',
      ]},
      { label: 'Mobile Communications', categories: [] },
      { label: 'Outdoor Living', categories: [
        'Outdoor Robotics',
        'Water Irrigation',
      ]},
      { label: 'Personal Care', categories: [
        'Beauty',
        'Breathalyser',
        'Cosmetic Fridges',
        'Dental Care',
        'Hair Care Products',
        'Hair Removal',
        'Massagers',
        'Makeup Mirrors',
        'Pet Clippers',
        'Mens Grooming',
      ]},
      { label: 'Promotion', categories: [
        'Charity',
        'Cash Back',
        'Promotion',
        'Shippers',
      ]},
      { label: 'Small Appliances', categories: [
        'Appliance Accessories',
        'Baby Products',
        'Electric Cookware',
        'Ovens',
        'Electric Fryware',
        'Garment Care',
        'Breakfast',
        'Specialty Appliances',
        'Miscellaneous',
        'Food Preparation',
        'Non Electric Cooking',
        'Toys & Home',
        'Water & Beverages',
        'Brewing Appliances',
        'Vacuum Sealers',
        'Water Boiling',
      ]},
      { label: 'Service', categories: [
        'Adjustment',
        'Allowance',
        'Bonus Gift Card Adjustment',
        'Product Care',
        'Gift Vouchers',
        'Installation',
        'Miscellaneous',
        'Non Rebatable',
        'Non Rebatable Product Care',
        'Recovery Services',
      ]},
      { label: 'Floorcare', categories: [
        'Accessories & Vacuum Bags',
        'Robotic',
        'Carpet Cleaners',
        'Hard Floor Cleaners',
        'Stickvac & Handheld',
        'Sweepers',
        'Vacuum Cleaners',
      ]},
    ],
  },
  {
    key: '5', label: 'Computers & Communications',
    sections: [
      { label: 'Accessories', categories: [] },
      { label: 'Apple', categories: [] },
      { label: 'Camping Drop Ship', categories: [] },
      { label: 'Communications & Office Products', categories: [] },
      { label: 'Connected Nursery', categories: [] },
      { label: 'Digital Activation Cards', categories: [] },
      { label: 'Connected Fitness & Health', categories: [] },
      { label: 'Hardware', categories: [] },
      { label: 'Printing & Imaging', categories: [] },
      { label: 'Internet', categories: [] },
      { label: 'Connected Kids', categories: [] },
      { label: 'Mobile Communications', categories: [] },
      { label: 'Photofinishing', categories: [] },
      { label: 'Software & Portable Media', categories: [] },
      { label: 'Services', categories: [] },
      { label: 'Storage', categories: [] },
      { label: 'Toys Drop Ship', categories: [] },
    ],
  },
  {
    key: '6', label: 'White Goods',
    sections: [
      { label: 'Agent Commission Sales', categories: [] },
      { label: 'Air Conditioning', categories: [
        'Cassette Type',
        'Under Ceiling Type',
        'Ducted System',
        'Inverter Split Systems - Reverse Cycle',
        'Inverter Split Systems - Cooling Only',
        'Mini Cassette Cooling Only',
        'Mini Cassette Reverse Cycle',
        'Multi Head Systems',
        'Mobile Air Conditioners',
        'Room Air Conditioners - Cooling Only',
        'Room Air Conditioners - Reverse Cycle',
        'Split Systems - Parts',
        'Split Systems - Cooling Only',
        'Split Systems - Floor / Ceiling',
        'Split Systems - Floor Mount',
        'Split Systems - Reverse Cycle',
        'Split Systems - Upright',
        'Window Air Conditioning',
      ]},
      { label: 'Cooking', categories: [
        'Cooking Accessories',
        'BBQ',
        'In-Built Coffee',
        'Combi-Set Ranges',
        'Compact Cookers',
        'Electric Cooktops',
        'Electric Oven Combinations',
        'Electric Ovens',
        'All Electric Upright Cookers',
        'Filter Systems',
        'Garbage Compactor',
        'Gas Cooktops',
        'All Gas Upright Cookers',
        'Gas Wall Ovens',
        'Hot Water Dispenser',
        'Ironing',
        'Kitchen',
        'In-Built Microwaves',
        'Built-In Kitchen Machine',
        'Cooking Miscellaneous',
        'Miscellaneous',
        'Multifuel Upright Cooker',
        'Cooking Packages',
        'Rangehood',
        'Sink & Tap',
        'Compact Steam Ovens',
        'Tubs',
        'Waste Disposal Units',
        'Water Filter',
      ]},
      { label: 'Dishwashers', categories: [
        'Dishwashers Freestanding',
        'Integrated',
        'Under Bench',
      ]},
      { label: 'Hot Water Systems', categories: [
        'Hot Water Systems Accessories',
        'Automatic Boiling Water Units',
        'Electric Hot Water Systems',
        'Gas Hot Water Systems',
        'Solar Hot Water Systems',
      ]},
      { label: 'Harvey Norman Installation', categories: [
        'Air Conditioning',
        'Electric Appliances',
        'Gas Appliances',
      ]},
      { label: 'Laundry', categories: [
        'Washer / Dryer Combination',
        'Clothes Dryers',
        'Front Load Washers',
        'Multi Washers',
        'Washer / Dryer Packages',
        'Top Load Washers',
        'Twin Tubs',
      ]},
      { label: 'Promotion', categories: [
        'Cash Back',
        'Charity',
        'Promotion',
      ]},
      { label: 'Refrigeration', categories: [
        'Refrigerators Cyclic Defrost',
        'Refrigerators French Door',
        'Refrigerators Top Mount',
        'Freezers',
        'Integrated',
        'Refrigerators Side by Side',
        'Other Refrigerators',
        'Refrigerators Bottom Mount',
        'Wine',
      ]},
      { label: 'Service', categories: [
        'Adjustment',
        'Allowance',
        'Bonus Gift Card Adjustment',
        'Product Care',
        'Gift Vouchers',
        'Installation',
        'Wines Promo',
        'Miscellaneous',
        'Non Rebatable',
        'Non Rebatable Product Care',
        'Recovery',
        'Services',
      ]},
      { label: 'Whitegoods Accessories', categories: [] },
    ],
  },
];

const SEARCH_MODES = [
  { id: 'productCode', label: 'Product Code', tag: 'Prod. Code', popular: true },
  { id: 'keywords', label: 'Key Words', tag: 'Keywords' },
  { id: 'description', label: 'Description', tag: 'Desc.' },
  { id: 'barCode', label: 'Bar Code', tag: 'Bar Code' },
];

// Action toolbar shown along the top of the Browse dialog — mirrors the real
// in-store terminal's function-key bar. "accessKey" is the underlined mnemonic
// letter (the real PosWin terminal underlines one letter per action so the
// operator knows which key to press); "key" is an F-key hint where the real
// terminal uses one instead of a letter.
const BROWSE_ACTIONS = [
  { id: 'search', label: 'Search', accessKey: 'S', live: true },
  { id: 'filter', label: 'Filter', accessKey: 'F', live: true },
  { id: 'view', label: 'View', accessKey: 'V', primary: true, live: true },
  { id: 'change', label: 'Change', accessKey: 'C' },
  { id: 'add', label: 'Add', accessKey: 'A' },
  { id: 'copy', label: 'Copy', accessKey: 'O' },
  { id: 'delete', label: 'Delete', accessKey: 'D' },
  { id: 'allocations', label: 'Allocations', accessKey: 'L' },
  { id: 'discounts', label: 'Discounts', accessKey: 'I' },
  { id: 'discountsHist', label: 'Discounts Hist', accessKey: 'H' },
  { id: 'salesOrders', label: 'Sales/Orders', accessKey: 'O' },
  { id: 'purchOrders', label: 'Purch/Orders', accessKey: 'P' },
  { id: 'batches', label: 'Batches', accessKey: 'B' },
  { id: 'ledger', label: 'Ledger', accessKey: 'L' },
  { id: 'qty', label: 'Qty', accessKey: 'Q' },
  { id: 'history', label: 'History', accessKey: 'Y' },
  { id: 'pricingCalc', label: 'Pricing Calc', key: 'F4', primary: true, live: true },
  { id: 'bundled', label: 'Bundled', key: 'F2' },
  { id: 'recommended', label: 'Recommended', key: 'F5' },
  { id: 'alternate', label: 'Alternate', key: 'F7' },
  { id: 'mobPlans', label: 'MobPlans', key: 'F6' },
  { id: 'prices', label: 'Prices', accessKey: 'R' },
  { id: 'productCare', label: 'Product Care', accessKey: 'T' },
  { id: 'showAll', label: 'Show All', key: 'F8' },
  { id: 'soh', label: 'SOH', key: 'F11' },
  { id: 'sort', label: 'Sort', key: 'F12' },
];

// Invoice Modification is no longer a menu item — it lives inside the Alt+I
// Invoice Lookup popup (press M there to toggle modify mode). Barcode Label
// Printing moved to the Inventory Menu; Online Quick Reservations lives only
// in the Other menu on the home screen.
const SALESPERSON_MENU = [
  { key: '1', label: 'Cash Sale' },
  { key: '2', label: 'Invoice New' },
  { key: '3', label: 'Undelivered Sales' },
  { key: '4', label: 'Purchase Request Menu' },
  { key: '5', label: 'All Insurance Invoices' },
  { key: '6', label: 'Incoming EDI Orders' },
  { key: '7', label: 'Online Orders' },
  { key: 'S', label: 'Product Care Orders' },
];

// Cash Sale / Invoice New / Invoice Modification removed — sales are raised
// from the Salesperson Menu; modification is via the Alt+I lookup popup.
const CASHIERS_MENU = [
  { key: '1', label: 'Retrieve Suspended Sale' },
  { key: '2', label: 'Pending Invoice Cancelation' },
  { key: '3', label: 'Invoice Further Payments' },
  { key: '4', label: 'Sundries and Other Payments Menu' },
  { key: '5', label: 'Other POS Transactions Menu' },
  { key: '6', label: 'Till Balancing' },
  { key: '7', label: 'CNP Transactions' },
];

// Cashiers → Sundries and Other Payments Menu (photo shows 6 live options;
// the legacy "0 - Quit to Previous Menu" is replaced by Esc-to-go-back).
const SUNDRIES_MENU = [
  { key: '1', label: 'Sundry Receipt' },
  { key: '2', label: 'Register Pay In-Out' },
  { key: '3', label: 'Multi Further Payments' },
  { key: '4', label: 'Admin Payments' },
  { key: '5', label: 'Finance Settlements' },
  { key: '6', label: 'Pro Forma Payment' },
];

// Cashiers → Other POS Transactions Menu (photo shows 8 live options).
const OTHER_POS_MENU = [
  { key: '1', label: 'Cash Sale Refund' },
  { key: '2', label: 'Invoice Refund' },
  { key: '3', label: 'Invoice Bookout' },
  { key: '4', label: 'Credit Note' },
  { key: '5', label: 'All Insurance Invoices' },
  { key: '6', label: 'EPAY Utility' },
  { key: '7', label: 'EFTPOS Utility' },
  { key: '8', label: 'GCS Utility' },
];

const INVENTORY_MENU = [
  { key: '1', label: 'Product Maintenance' },
  { key: '2', label: 'Specials and Promotions' },
  { key: '3', label: 'Price Protection and Deletions' },
  { key: '4', label: 'Price Change History' },
  { key: '5', label: 'Product Group Codes' },
  { key: '6', label: 'Stocktake Menu' },
  { key: '7', label: 'Creditors Transactions Listing' },
  { key: '8', label: 'Mobile Device Selection' },
  { key: '9', label: 'Barcode Label Printing' }, // moved here from Salesperson/Purchasing — label printing is a stock task
];

const PURCHASING_MENU = [
  { key: '1', label: 'Add Manual Purchase Request' },
  { key: '2', label: 'Purchase Request and Approvals' },
  { key: '3', label: 'Modify Purchasing Order' },
  { key: '4', label: 'Cancel Purchase Order' },
  { key: '5', label: 'Purchase Order Response Exceptions' },
  { key: '6', label: 'Retrieve Suspended Request' },
  { key: '7', label: 'Rebuild Suggested Purchase Request' },
  { key: '8', label: 'Suppliers' },
];

// Salesperson → Purchase Request Menu (photo shows 3 live options; the legacy
// "0 - Quit to Previous Menu" is replaced by Esc-to-go-back in our POS).
const PURCHASE_REQUEST_MENU = [
  { key: '1', label: 'Add Manual Purchase Request' },
  { key: '2', label: 'Purchase Request and Approvals' },
  { key: '3', label: 'Rebuild Suggested Purchase Request' },
];

const REPORTS_MENU = [
  { key: '1', label: 'List of All Reports' },
  { key: '2', label: 'Written Sales Reports' },
  { key: '3', label: 'Delivered Sales Reports' },
  { key: '4', label: 'Product Reports' },
  { key: '5', label: 'Inventory Reports' },
  { key: '6', label: 'Supplier Reports' },
  { key: '7', label: 'Purchasing Reports' },
  { key: '8', label: 'Sales Reports' },
  { key: '9', label: 'Customer Reports' },
  { key: '0', label: 'Favourite Reports' }, // moved in from the home screen
];

const OTHER_PROPRIETOR_MENU = [
  { key: '1', label: 'Approve Creditors Transactions' },
  { key: '2', label: 'Product Care Menu' },
  { key: '3', label: 'Written Sales History' },
  { key: '4', label: 'Delivered Sales History' },
  { key: '5', label: 'User Setup' },
  { key: '6', label: 'Re-build Sales History' },
  { key: '7', label: 'Split/Merge Report' },
];

const INVOICE_ENQUIRY_MENU = [
  { key: '1', label: 'Sales Invoices' },
  { key: '2', label: 'All Undelivered Sales' },
  { key: '3', label: 'User Reports' },
];

const EOD_MENU = [
  { key: '1', label: 'Automated EOD Setup' },
  { key: '2', label: 'EOD History' },
  { key: '3', label: 'Open All Terminals' },
  { key: '4', label: 'Close the Store' },
  { key: '5', label: 'Terminals' },
  { key: '6', label: 'Import Host Maintenance' },
];

// Online Orders and Undelivered Sales removed — they live only in the
// Salesperson Menu now. Online Quick Reservations stays here (it was removed
// from the Salesperson Menu instead).
const OTHER_MENU = [
  { key: '1', label: 'Brightside Product Care Orders' },
  { key: '2', label: 'Online Quick Reservations' },
  { key: '3', label: 'Quotes' },
  { key: '4', label: 'Written Sales Today' },
  { key: '5', label: 'Customer Service Tickets' },
  { key: '6', label: "Sales KPI's" },
  { key: '7', label: 'F2F Requests' },
  { key: '8', label: 'Assurant Orders' },
  { key: 'P', label: 'Purchase Order Response Exceptions' },
  { key: 'H', label: 'HFM Orders Pending in PRAS' },
  { key: 'R', label: 'Recommended Orders Pending in PRAS' },
];

// Favourite Reports moved inside the Reports Menu (key 0 there), so the home
// screen runs 1–8 plus 0 for Other.
const HOME_MENU = [
  { key: '1', label: 'Salesperson Menu' },
  { key: '2', label: 'Cashiers Menu' },
  { key: '3', label: 'Inventory Menu' },
  { key: '4', label: 'Purchasing Menu' },
  { key: '5', label: 'Reports Menu' },
  { key: '6', label: 'Other Proprietor Menu' },
  { key: '7', label: 'Reports and Invoice Enquiry Menu' },
  { key: '8', label: 'End of Day Menu' },
  { key: '0', label: 'Other' },
];

// Icons for the home (main menu) sidebar, mirroring the reference design.
const HOME_ICONS = {
  '1': UserRound,
  '2': CashRegisterIcon,
  '3': ClipboardList,
  '4': ShoppingCart,
  '5': BarChart3,
  '6': UserRound,
  '7': FileText,
  '8': CalendarDays,
  '0': DotGridIcon,
};

// Per-menu icon sets. Keys map to each menu item's key.
const SALESPERSON_ICONS = {
  '1': Banknote,        // Cash Sale
  '2': Receipt,         // Invoice New
  '3': Truck,           // Undelivered Sales
  '4': ShoppingCart,    // Purchase Request Menu
  '5': ShieldCheck,     // All Insurance Invoices
  '6': MailPlus,        // Incoming EDI Orders
  '7': ShoppingBag,     // Online Orders
  'S': Wrench,          // Product Care Orders
};

const CASHIERS_ICONS = {
  '1': Undo2,           // Retrieve Suspended Sale
  '2': X,               // Pending Invoice Cancelation
  '3': CreditCard,      // Invoice Further Payments
  '4': Coins,           // Sundries and Other Payments
  '5': LayoutGrid,      // Other POS Transactions
  '6': Percent,         // Till Balancing
  '7': CreditCard,      // CNP Transactions
};

const SUNDRIES_ICONS = {
  '1': Receipt,         // Sundry Receipt
  '2': Banknote,        // Register Pay In-Out
  '3': Coins,           // Multi Further Payments
  '4': ClipboardCheck,  // Admin Payments
  '5': CreditCard,      // Finance Settlements
  '6': FileText,        // Pro Forma Payment
};

const OTHER_POS_ICONS = {
  '1': Undo2,           // Cash Sale Refund
  '2': RotateCcw,       // Invoice Refund
  '3': Boxes,           // Invoice Bookout
  '4': FileText,        // Credit Note
  '5': ShieldCheck,     // All Insurance Invoices
  '6': Coins,           // EPAY Utility
  '7': CreditCard,      // EFTPOS Utility
  '8': Gift,            // GCS Utility
};

const INVENTORY_ICONS = {
  '1': Package,         // Product Maintenance
  '2': Tags,            // Specials and Promotions
  '3': Tag,             // Price Protection and Deletions
  '4': History,         // Price Change History
  '5': LayoutGrid,      // Product Group Codes
  '6': Boxes,           // Stocktake Menu
  '7': Receipt,         // Creditors Transactions Listing
  '8': Monitor,         // Mobile Device Selection
  '9': ScanBarcode,     // Barcode Label Printing
};

const PURCHASING_ICONS = {
  '1': ClipboardList,   // Add Manual Purchase Request
  '2': ClipboardCheck,  // Purchase Request and Approvals
  '3': FileText,        // Modify Purchasing Order
  '4': X,               // Cancel Purchase Order
  '5': ListChecks,      // Purchase Order Response Exceptions
  '6': Undo2,           // Retrieve Suspended Request
  '7': RotateCcw,       // Rebuild Suggested Purchase Request
  '8': Building2,       // Suppliers
};

const PURCHASE_REQUEST_ICONS = {
  '1': ClipboardList,   // Add Manual Purchase Request
  '2': ClipboardCheck,  // Purchase Request and Approvals
  '3': RotateCcw,       // Rebuild Suggested Purchase Request
};

// Mock purchase-order requests for the Approvals screen (transcribed from the
// live terminal). Each row's `detail` feeds the right-hand supplier/product
// panel; praDetail() fills any gaps for the lighter rows.
const PRA_REQUESTS = [
  {
    id: 'r1', reqNo: '247963', supplier: '612744', supplierName: 'ARISIT PTY LIMITED', supplierFrom: 'FROM 010207',
    dept: '061', code: 'EM300', desc: 'MEDISANA EMS NECK MASSAGE - EM300',
    qty: 1, cost: 34.65, notBefore: '03/07/26', deliverTo: 'Alternate', source: 'MAN', userReq: '6131', reqDate: '03/07/26',
    detail: {
      minOrderValue: 99.00, avgLeadTime: 14, difot: 0, skuPct: 0, supplierPct: 1, status: 'Active',
      desc2: 'EMS MASSAGE 5 MODES 9 INTENSITY LEVELS RED LIGHT & HEAT', model: '', supplierCode: 'EM300',
      group: '061PERMAS010', range: 'B', availableOnline: 'Yes',
      replenishMethod: 'None', suppReorderQty: 4.00, storeReorderQty: 0.00, localPO: 'Y', stockConstrained: 'N', avgWeeklyDemand: 0.17,
      qty: { physicalSOH: 4, physicalTag: 215.37, notAvail: 1, notAvailTag: 71.79, salesOrders: 0, onlineNotGen: 0, availInStore: 3, onPO: 0, totalAvail: 3 },
      buy: { invoice: 69.30, freight: 1.39, internalRebate: 1.10, costExTax: 71.79, oaSales: 0, oaPurchase: 0, oaRebate: 15.25 },
      ledger: [
        { date: '29/01/26', qty: -4.00, type: 'STK/AVG', user: '2643', cost: 71.79, sell: 99.00 },
        { date: '29/01/26', qty: 4.00, type: 'STK/AVG', user: '2643', cost: 71.79, sell: 99.00 },
        { date: '19/06/26', qty: -1.00, type: 'SALE', user: '5450', cost: 71.79, sell: 69.00 },
      ],
    },
  },
  {
    id: 'r2', reqNo: '247963', supplier: '612744', supplierName: 'ARISIT PTY LIMITED', supplierFrom: 'FROM 010207',
    dept: '061', code: 'EM300', desc: 'MEDISANA EMS NECK MASSAGE - EM300',
    qty: 3, cost: 69.30, notBefore: '03/07/26', deliverTo: 'Alternate', source: 'MAN', userReq: '6131', reqDate: '03/07/26',
    detail: null, // same product as r1 — praDetail() reuses r1's block
  },
  {
    id: 'r3', reqNo: '247964', supplier: '606419', supplierName: 'ELECTROLUX HOME PRODUCTS', supplierFrom: 'FROM 010207',
    dept: '070', code: 'WSD73HWA', desc: 'WEST/HOUSE 7.3KW SPLIT SYSTEM RAC',
    qty: 1, cost: 1661.00, notBefore: '', deliverTo: 'Pickup', source: 'HFM', userReq: '6478', reqDate: '03/07/26',
    detail: {
      minOrderValue: 0, avgLeadTime: 10, difot: 92, skuPct: 0, supplierPct: 3, status: 'Active',
      desc2: 'WESTINGHOUSE 7.3KW REVERSE CYCLE SPLIT SYSTEM', model: 'WSD73HWA', supplierCode: 'WSD73HWA',
      group: '070AIRCON050', range: 'A', availableOnline: 'Yes',
      replenishMethod: 'Dynamic Min Max', suppReorderQty: 1.00, storeReorderQty: 0.00, localPO: 'N', stockConstrained: 'N', avgWeeklyDemand: 0.42,
      qty: { physicalSOH: 2, physicalTag: 3322.00, notAvail: 0, notAvailTag: 0, salesOrders: 1, onlineNotGen: 0, availInStore: 1, onPO: 3, totalAvail: 1 },
      buy: { invoice: 1661.00, freight: 24.00, internalRebate: 40.00, costExTax: 1645.00, oaSales: 0, oaPurchase: 0, oaRebate: 0 },
      ledger: [
        { date: '02/07/26', qty: 2.00, type: 'STK/AVG', user: '2643', cost: 1645.00, sell: 2795.00 },
      ],
    },
  },
  {
    id: 'r4', reqNo: '247973', supplier: '610045', supplierName: 'WHIRLPOOL (AUSTRALIA)', supplierFrom: 'FROM 010207',
    dept: '070', code: 'FWRB8012IW', desc: 'WHIRLPOOL TIME WASH 8KG/1400RPM F/LOADER',
    qty: 1, cost: 500.00, notBefore: '', deliverTo: 'Pickup', source: 'HFM', userReq: '6478', reqDate: '04/07/26', special: 'Discontinued',
    detail: {
      minOrderValue: 0, avgLeadTime: 7, difot: 88, skuPct: 0, supplierPct: 2, status: 'Active',
      desc2: 'WHIRLPOOL 8KG FRONT LOAD WASHER — TIME WASH', model: 'FWRB8012IW', supplierCode: 'FWRB8012IW',
      group: '070LAUNDRY030', range: 'B', availableOnline: 'Yes',
      replenishMethod: 'Recommended', suppReorderQty: 1.00, storeReorderQty: 0.00, localPO: 'Y', stockConstrained: 'N', avgWeeklyDemand: 0.30,
      qty: { physicalSOH: 1, physicalTag: 500.00, notAvail: 0, notAvailTag: 0, salesOrders: 0, onlineNotGen: 0, availInStore: 1, onPO: 1, totalAvail: 1 },
      buy: { invoice: 500.00, freight: 12.00, internalRebate: 8.00, costExTax: 504.00, oaSales: 0, oaPurchase: 0, oaRebate: 0 },
      ledger: [
        { date: '10/06/26', qty: 1.00, type: 'STK/AVG', user: '2643', cost: 504.00, sell: 899.00 },
      ],
    },
  },
];

// Product Care Orders (photo 4): store-credit / product-care orders list.
const PCO_ORDERS = [
  { id: 'PO-BS-010091348', created: '03/05/2021 02:58:10', total: 300.00, delFee: 0, pickFee: 0, approved: 300.00, apprNo: 'EPC21062571', custNo: '415181698', surname: 'HIREMATH', deliver: 'Pickup',
    invCust: '1300880459 / PCASA OPERATIONS-ICF', salesType: 'ICF', payType: 'Credit Card',
    delivery: { name: 'A HIREMATH', a1: '113 Harmony Dr', a2: 'TARNEIT VIC 3029', email: 'no-email-address-present@brightsideco.com.au' },
    billing: { no: '1300880459', name: 'PCASA Pty Ltd', a1: '34-46 Brookhollow Ave', a2: 'Baulkham Hills NSW 2153', email: 'info@brightsideco.com.au' },
    orderNotes: 'custom' },
  { id: 'PO-BS-010099941', created: '03/05/2021 03:40:22', total: 399.00, delFee: 0, pickFee: 0, approved: 399.00, apprNo: 'EPC21062895', custNo: '410399196', surname: 'JOSE', deliver: 'Pickup',
    invCust: '1300880459 / PCASA OPERATIONS-ICF', salesType: 'ICF', payType: 'Credit Card',
    delivery: { name: 'M JOSE', a1: '5 Kingfisher Ct', a2: 'POINT COOK VIC 3030', email: 'no-email-address-present@brightsideco.com.au' },
    billing: { no: '1300880459', name: 'PCASA Pty Ltd', a1: '34-46 Brookhollow Ave', a2: 'Baulkham Hills NSW 2153', email: 'info@brightsideco.com.au' },
    orderNotes: '' },
  { id: 'PO-BS-010796043', created: '02/07/2021 02:28:40', total: 148.00, delFee: 0, pickFee: 0, approved: 148.00, apprNo: 'EPC20137950', custNo: '0430000344', surname: 'UPRETI', deliver: 'Pickup',
    invCust: '1300880459 / PCASA OPERATIONS-ICF', salesType: 'ICF', payType: 'Credit Card',
    delivery: { name: 'S UPRETI', a1: '22 Sovereign Dr', a2: 'TRUGANINA VIC 3029', email: 'no-email-address-present@brightsideco.com.au' },
    billing: { no: '1300880459', name: 'PCASA Pty Ltd', a1: '34-46 Brookhollow Ave', a2: 'Baulkham Hills NSW 2153', email: 'info@brightsideco.com.au' },
    orderNotes: '' },
  { id: 'PO-BS-014078707', created: '17/03/2022 22:12:07', total: 1814.96, delFee: 50.00, pickFee: 30.00, approved: 1894.96, apprNo: 'EPC22024657', custNo: '413105520', surname: 'MAHMUD', deliver: 'Pickup',
    invCust: '1300880459 / PCASA OPERATIONS-ICF', salesType: 'ICF', payType: 'Credit Card',
    delivery: { name: 'R MAHMUD', a1: '8 Featherbrook Dr', a2: 'POINT COOK VIC 3030', email: 'no-email-address-present@brightsideco.com.au' },
    billing: { no: '1300880459', name: 'PCASA Pty Ltd', a1: '34-46 Brookhollow Ave', a2: 'Baulkham Hills NSW 2153', email: 'info@brightsideco.com.au' },
    orderNotes: '' },
  { id: 'PO-BS-014243306', created: '12/04/2022 08:14:27', total: 739.00, delFee: 50.00, pickFee: 30.00, approved: 819.00, apprNo: 'EPC22038421', custNo: '0424284900', surname: 'KHAIRA', deliver: 'Delivery',
    invCust: '1300880459 / PCASA OPERATIONS-ICF', salesType: 'ICF', payType: 'Credit Card',
    delivery: { name: 'P KHAIRA', a1: '14 Manor Lakes Blvd', a2: 'WYNDHAM VALE VIC 3024', email: 'no-email-address-present@brightsideco.com.au' },
    billing: { no: '1300880459', name: 'PCASA Pty Ltd', a1: '34-46 Brookhollow Ave', a2: 'Baulkham Hills NSW 2153', email: 'info@brightsideco.com.au' },
    orderNotes: '' },
  { id: 'PO-BS-014588002', created: '29/04/2022 00:40:43', total: 1745.00, delFee: 50.00, pickFee: 30.00, approved: 1825.00, apprNo: 'EPC22052447', custNo: '420658880', surname: 'NACOR', deliver: 'Delivery',
    invCust: '1300880459 / PCASA OPERATIONS-ICF', salesType: 'ICF', payType: 'Credit Card',
    delivery: { name: 'J NACOR', a1: '3 Greenvale Dr', a2: 'TARNEIT VIC 3029', email: 'no-email-address-present@brightsideco.com.au' },
    billing: { no: '1300880459', name: 'PCASA Pty Ltd', a1: '34-46 Brookhollow Ave', a2: 'Baulkham Hills NSW 2153', email: 'info@brightsideco.com.au' },
    orderNotes: '' },
];

const REPORTS_ICONS = {
  '1': ListOrdered,     // List of All Reports
  '2': FileText,        // Written Sales Reports
  '3': PackageCheck,    // Delivered Sales Reports
  '4': Package,         // Product Reports
  '5': Boxes,           // Inventory Reports
  '6': Building2,       // Supplier Reports
  '7': ShoppingCart,    // Purchasing Reports
  '8': BarChart3,       // Sales Reports
  '9': Users,           // Customer Reports
  '0': Star,            // Favourite Reports
};

const OTHER_PROPRIETOR_ICONS = {
  '1': ClipboardCheck,  // Approve Creditors Transactions
  '2': Wrench,          // Product Care Menu
  '3': FileText,        // Written Sales History
  '4': PackageCheck,    // Delivered Sales History
  '5': Users,           // User Setup
  '6': RotateCcw,       // Re-build Sales History
  '7': GitMerge,        // Split/Merge Report
};

const INVOICE_ENQUIRY_ICONS = {
  '1': Receipt,         // Sales Invoices
  '2': Truck,           // All Undelivered Sales
  '3': FileSpreadsheet, // User Reports
};

const EOD_ICONS = {
  '1': Settings2,       // Automated EOD Setup
  '2': FolderClock,     // EOD History
  '3': Power,           // Open All Terminals
  '4': PowerOff,        // Close the Store
  '5': Monitor,         // Terminals
  '6': GitMerge,        // Import Host Maintenance
};

const OTHER_ICONS = {
  '1': ShieldCheck,     // Brightside Product Care Orders
  '2': PackageCheck,    // Online Quick Reservations
  '3': FileText,        // Quotes
  '4': FileSpreadsheet, // Written Sales Today
  '5': Ticket,          // Customer Service Tickets
  '6': BarChart3,       // Sales KPI's
  '7': HeartHandshake,  // F2F Requests
  '8': Gift,            // Assurant Orders
  'P': ClipboardCheck,  // Purchase Order Response Exceptions
  'H': Boxes,           // HFM Orders Pending in PRAS
  'R': ListChecks,      // Recommended Orders Pending in PRAS
};

const SCREEN_LABELS = {
  home: 'Main Menu',
  salesperson: 'Salesperson Menu',
  cashiers: 'Cashiers Menu',
  inventory: 'Inventory Menu',
  purchasing: 'Purchasing Menu',
  reports: 'Reports Menu',
  otherProprietor: 'Other Proprietor Menu',
  invoiceEnquiry: 'Reports and Invoice Enquiry Menu',
  eod: 'End of Day Menu',
  other: 'Other',
  purchaseRequest: 'Purchase Request Menu',
  manualPR: 'Manual Purchase Request',
  prApprovals: 'Purchase Request and Approvals',
  rebuildPR: 'Rebuild Suggested Purchase Request',
  cashSale: 'Cash Sale',
  barcodePrint: 'Barcode Label Printing',
  insuranceInvoices: 'All Insurance Invoices',
  ediOrders: 'Incoming EDI Orders',
  productCareOrders: 'Product Care Orders',
  onlineOrders: 'Online Orders',
  undeliveredSales: 'Undelivered Sales',
  customerServiceTickets: 'Customer Service Tickets',
  quotations: 'Quotations',
  reservations: 'Online Quick Reservations',
  salesKpis: "Sales KPI's",
  invoiceModifyDetail: 'Invoice Modification',
  retrieveSuspended: 'Retrieve Suspended Sale',
  pendingCancel: 'Pending Invoice Cancelation',
  furtherPayments: 'Invoice Further Payments',
  sundriesMenu: 'Sundries and Other Payments Menu',
  otherPosMenu: 'Other POS Transactions Menu',
  tillBalancing: 'Till Balancing',
  cnpTransactions: 'CNP Transactions',
  invoiceSearch: 'New Invoice',
  createCustomer: 'Create Customer',
  invoice: 'Invoice',
};

const DATE_FORMATTER = new Intl.DateTimeFormat('en-AU', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-AU', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

// Mock customer directory (stands in for the real lookup until SAP data is wired up).
// The two Brennan records share an address to demonstrate the multi-result path;
// phone/mobile numbers are unique, per the "one account per phone" rule.
// Mock operator directory — maps 4-digit operator numbers to display names.
// Stand-in until the real SAP staff lookup is wired up.
const OPERATOR_NAMES = {
  '1001': 'Mikael Lindqvist',
  '1002': 'Sarah Nguyen',
  '1003': 'James Whitlock',
  '1979': 'Mikael Khan',
  '2200': 'Anooshey Malik',
};

const MOCK_CUSTOMERS = [
  {
    id: 'CU100791', firstName: 'Mikael', lastName: 'Khan',
    mobile: '0490 356 229', phone: '',
    address: '66 Alamanda Boulevard, Point Cook VIC 3030',
    deliveryAddress: '66 Alamanda Boulevard, Point Cook VIC 3030',
    email: 'mikaelalikhan1@gmail.com',
  },
  {
    id: 'CU100482', firstName: 'James', lastName: 'Whitlock',
    mobile: '0412 884 219', phone: '03 9749 2210',
    address: '24 Derrimut Rd, Hoppers Crossing VIC 3029',
    deliveryAddress: '24 Derrimut Rd, Hoppers Crossing VIC 3029',
    email: 'j.whitlock@example.com',
  },
  {
    id: 'CU100517', firstName: 'Sarah', lastName: 'Nguyen',
    mobile: '0423 119 875', phone: '',
    address: '8 Morris St, Werribee VIC 3030',
    deliveryAddress: '8 Morris St, Werribee VIC 3030',
    email: 'sarah.nguyen@example.com',
  },
  {
    id: 'CU100643', firstName: 'Michael', lastName: 'Brennan',
    mobile: '0401 552 318', phone: '03 9742 8890',
    address: '15 Tarneit Rd, Werribee VIC 3030',
    deliveryAddress: '15 Tarneit Rd, Werribee VIC 3030',
    email: 'm.brennan@example.com',
  },
  {
    id: 'CU100644', firstName: 'Emma', lastName: 'Brennan',
    mobile: '0419 770 145', phone: '03 9742 8890',
    address: '15 Tarneit Rd, Werribee VIC 3030',
    deliveryAddress: '15 Tarneit Rd, Werribee VIC 3030',
    email: 'e.brennan@example.com',
  },
];

const normalizePhone = (s) => (s || '').replace(/\D/g, '');
const normalizeAddr = (s) => (s || '').trim().toLowerCase().replace(/\s+/g, ' ');

function searchCustomersByPhone(phone) {
  const p = normalizePhone(phone);
  if (!p) return [];
  return MOCK_CUSTOMERS.filter(
    (c) => normalizePhone(c.mobile) === p || (c.phone && normalizePhone(c.phone) === p)
  );
}

function searchCustomersByAddress(addr) {
  const a = normalizeAddr(addr);
  if (!a) return [];
  return MOCK_CUSTOMERS.filter((c) => {
    const ca = normalizeAddr(c.address);
    return ca.includes(a) || a.includes(ca);
  });
}

// Mock invoice records — stand-in until SAP invoices are wired up.
// financials: all six ledger fields shown on the Invoice Modification screen.
const MOCK_INVOICES = [
  {
    id: 'INV-004821', customerId: 'CU100482', date: '2025-06-02', total: '$3,249.00', status: 'Delivered',
    operator: '2200', takenItems: 2, undeliveredItems: 0, deliveryFee: '$49.00', paymentType: 'card',
    notes: 'Customer requested call ahead before delivery.',
    financials: {
      invoiceTotal:     '$3,249.00',
      paidToDate:       '$3,249.00',
      financePaid:      '$0.00',
      goodsOutstanding: '$0.00',
      outstandingDebt:  '$0.00',
      balanceOwing:     '$0.00',
    },
  },
  {
    id: 'INV-004955', customerId: 'CU100517', date: '2025-06-08', total: '$899.00', status: 'Pending',
    operator: '1002', takenItems: 0, undeliveredItems: 1, deliveryFee: '$0.00', paymentType: 'latitude',
    notes: '',
    financials: {
      invoiceTotal:     '$899.00',
      paidToDate:       '$0.00',
      financePaid:      '$899.00',
      goodsOutstanding: '$899.00',
      outstandingDebt:  '$0.00',
      balanceOwing:     '$0.00',
    },
  },
  {
    id: 'INV-005102', customerId: 'CU100643', date: '2025-06-14', total: '$1,599.00', status: 'Pending',
    operator: '1001', takenItems: 1, undeliveredItems: 1, deliveryFee: '$59.00', paymentType: 'card',
    notes: 'Fragile item — handle with care on delivery.',
    financials: {
      invoiceTotal:     '$1,599.00',
      paidToDate:       '$800.00',
      financePaid:      '$0.00',
      goodsOutstanding: '$799.00',
      outstandingDebt:  '$799.00',
      balanceOwing:     '$799.00',
    },
  },
  {
    id: 'INV-005103', customerId: 'CU100644', date: '2025-06-14', total: '$249.00', status: 'Delivered',
    operator: '1001', takenItems: 1, undeliveredItems: 0, deliveryFee: '$0.00', paymentType: 'cash',
    notes: '',
    financials: {
      invoiceTotal:     '$249.00',
      paidToDate:       '$249.00',
      financePaid:      '$0.00',
      goodsOutstanding: '$0.00',
      outstandingDebt:  '$0.00',
      balanceOwing:     '$0.00',
    },
  },
];

function searchInvoiceById(invId) {
  const q = invId.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!q) return [];
  return MOCK_INVOICES.filter((inv) => inv.id.replace(/[^A-Z0-9]/g, '').includes(q));
}

// Look up the customer attached to an invoice result
function customerForInvoice(inv) {
  return MOCK_CUSTOMERS.find((c) => c.id === inv.customerId) || null;
}

// "$1,599.00" → 1599 — client-side ledger maths for the Cashiers screens.
function parseMoney(s) {
  const n = parseFloat(String(s).replace(/[^0-9.-]/g, ''));
  return isFinite(n) ? n : 0;
}

// ─── Cashiers Menu mock data (transcribed from the live terminal) ────────────

// Retrieve Suspended Sale — the two suspended tapes visible on the terminal.
const MOCK_SUSPENDED_SALES = [
  { id: 's1', date: '03/07/2026', time: '17:09', till: '202', txn: '7436499', invoice: '3304469',
    assistant: '2921 RAJAT MOAR', user: '2921', type: 'Invoice', saveAt: 'Item Ent', amount: '',
    notes: 'Customer stepped away to measure car boot — resume when they return.' },
  { id: 's2', date: '04/07/2026', time: '16:17', till: '135', txn: '7437193', invoice: '3304680',
    assistant: '6478 SAVRINA SHARMA', user: '6116', type: 'Invoice', saveAt: 'Item Ent', amount: '',
    notes: '' },
];

// Pending Invoice Cancelation — reason codes behind the F4=List popup.
const CANCEL_REASON_CODES = [
  { code: '01', label: 'Customer changed mind' },
  { code: '02', label: 'Pricing error' },
  { code: '03', label: 'Duplicate invoice' },
  { code: '04', label: 'Stock unavailable' },
  { code: '05', label: 'Raised in error' },
  { code: '06', label: 'Other' },
];

// Till Balancing — cash denominations and tender lines from the terminal.
const TILL_FLOAT = 100.00;
const TILL_DENOMS = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05];
const TILL_TENDERS = [
  { id: 'cash',       label: 'Cash',        cashLinked: true, expected: TILL_FLOAT }, // float only — fresh till
  { id: 'eftpos',     label: 'E.F.T.Pos',   expected: 0 },
  { id: 'eftposAmex', label: 'EFTPos-Amex', expected: 0 },
  { id: 'eftposDiner',label: 'EFTPos-Diner',expected: 0 },
  { id: 'cheque',     label: 'Cheque',      expected: 0 },
  { id: 'manEft',     label: 'Man EFT',     expected: 0 },
  { id: 'manccAmex',  label: 'ManCC-Amex',  expected: 0 },
  { id: 'manccDiner', label: 'ManCC-Diner', expected: 0 },
  { id: 'hngc',       label: 'HNGC',        expected: 0 },
  { id: 'admPay',     label: 'ADM Pay',     expected: 0 },
];

// CNP Transactions — the Payment Requests grid (all rows from the terminal).
// Truncated surnames on screen are completed with plausible spellings.
const CNP_REQUESTS = [
  { id: '3301561', fran: '13660', date: '28/06/2026', name: 'JARROD NORRIS',    payee: 'JARROD NORRIS',    amount: 650.00,   status: 'Pending', requestor: '6131 - DAVE M', expiring: '3/07/2026',
    detail: {
      requested: '28/06/2026 10:21:59 AM', reqNo: '011360001001192',
      sentTo: { custNo: '1044948', name: 'JARROD NORRIS', postcode: '3024', phone: '0409955267', email: 'LAURA.KING2@EDUCATION.VIC.GOV.AU' },
      fin: { raised: '25/06/26', saleType: 'CASH', invoiceTotal: 650, payments: 0, bookedOut: 0, undelivered: 650, creditNotes: 0, balanceOwing: 650, balanceToPay: 650, deliveryFee: 0, amountToCollect: 650, approvalNo: '', approvedAmount: 0, financeAmount: 0 },
      tran: { no: '011360001001192', query: '04/07/2026 04:56:23 PM', queryId: '1001192', queryCount: 99, respType: 'Payment', authCode: '', successful: 'False', respCode: '06', instrument: 'None', vendorId: '0', amount: 650 },
    } },
  { id: '3302696', fran: '13660', date: '28/06/2026', name: 'PANKAJ UPEBHYAY',  payee: 'PANKAJ UPEBHYAY',  amount: 581.00,   status: 'Pending', requestor: '6131 - DAVE M', expiring: '3/07/2026', detail: null },
  { id: '3280530', fran: '13660', date: '29/06/2026', name: 'RIITTAAHA LAINEY', payee: 'RIITTAAHA LAINEY', amount: 2201.00,  status: 'Pending', requestor: '6011 - DORINA', expiring: '4/07/2026', detail: null },
  { id: '3302987', fran: '13660', date: '29/06/2026', name: 'DEEPAK MOOTHART',  payee: 'DEEPAK MOOTHART',  amount: 250.00,   status: 'Pending', requestor: '1979 - MIKAEL', expiring: '4/07/2026', detail: null },
  { id: '3303726', fran: '13660', date: '30/06/2026', name: 'SHAILESH PATEL',   payee: 'SHAILESH PATEL',   amount: 18000.00, status: 'Pending', requestor: '6131 - DAVE M', expiring: '5/07/2026', detail: null },
  { id: '3303621', fran: '13660', date: '30/06/2026', name: 'NICHOLAS CARUSO',  payee: 'NICHOLAS CARUSO',  amount: 890.00,   status: 'Pending', requestor: '6117 - CHAMI',  expiring: '5/07/2026', detail: null },
  { id: '3303933', fran: '13660', date: '30/06/2026', name: 'DANIEL TORZILLO',  payee: 'DANIEL TORZILLO',  amount: 3700.00,  status: 'Pending', requestor: '7254 - Johnny', expiring: '5/07/2026', detail: null },
  { id: '3304038', fran: '13660', date: '1/07/2026',  name: 'ARPIT ARPIT',      payee: 'ARPIT ARPIT',      amount: 240.00,   status: 'Pending', requestor: '6131 - DAVE M', expiring: '6/07/2026', detail: null },
  { id: '3304247', fran: '13660', date: '2/07/2026',  name: 'CHERIE HARBERT',   payee: 'CHERIE HARBERT',   amount: 1788.00,  status: 'Pending', requestor: '5450 - JORDEN', expiring: '7/07/2026', detail: null },
  { id: '3302512', fran: '13660', date: '3/07/2026',  name: "CAMILLA O'HAIRE",  payee: "CAMILLA O'HAIRE",  amount: 842.00,   status: 'Pending', requestor: '4088 - RICHIE', expiring: '8/07/2026', detail: null },
];

// Fill detail blocks for the lighter CNP rows (only the top row was fully
// legible on the terminal) — derived values keep the panel populated.
function cnpDetail(r) {
  if (r.detail) return r.detail;
  const tail = r.id.slice(-4);
  const reqNo = `01136000100${tail}`;
  return {
    requested: `${r.date} 09:${String(10 + (Number(tail) % 49)).padStart(2, '0')}:00 AM`,
    reqNo,
    sentTo: { custNo: `10${tail}48`, name: r.payee, postcode: '3029', phone: '', email: '' },
    fin: { raised: r.date.slice(0, -4) + r.date.slice(-2), saleType: 'CASH', invoiceTotal: r.amount, payments: 0, bookedOut: 0, undelivered: r.amount, creditNotes: 0, balanceOwing: r.amount, balanceToPay: r.amount, deliveryFee: 0, amountToCollect: r.amount, approvalNo: '', approvedAmount: 0, financeAmount: 0 },
    tran: { no: reqNo, query: '04/07/2026 04:56:23 PM', queryId: tail, queryCount: 1, respType: 'Payment', authCode: '', successful: 'False', respCode: '06', instrument: 'None', vendorId: '0', amount: r.amount },
  };
}

// ─── Mock Online Orders ──────────────────────────────────────────────────────
// Stand-in for the Movex online-order feed until SAP/Movex is wired up.
// Shapes mirror the real terminal's Online Orders screen (order list + the
// detail pane: sales-order info, billing/delivery, notes, progress, stock).
const MOCK_ONLINE_ORDERS = [
  {
    orderNo: '31003997449', date: '29/06/2026', total: 568.00, name: 'Frisina, Joe',
    dispatch: 'Delivery', status: 'New',
  },
  {
    orderNo: '31003996866', date: '29/06/2026', total: 173.00, name: 'Chaudhri, Hetal',
    dispatch: 'Pick up', status: 'Pending',
  },
  {
    orderNo: '31003996822', date: '29/06/2026', total: 97.00, name: 'Jaiswal, Avinash',
    dispatch: 'Pick up', status: 'Pending',
  },
  {
    orderNo: '31003996535', date: '29/06/2026', total: 398.00, name: 'Saha, Shiplu',
    dispatch: 'Pick up', status: 'Pending',
  },
  {
    orderNo: '31003995653', date: '29/06/2026', total: 447.00, name: 'Takkallapalli, Sunil Kumar',
    dispatch: 'Pick up', status: 'Completed',
  },
  {
    orderNo: '31003995512', date: '29/06/2026', total: 69.00, name: 'Weybury, Courtney',
    dispatch: 'Delivery', status: 'Completed',
  },
  {
    orderNo: '31003995494', date: '29/06/2026', total: 2281.00, name: 'Brennan, Josh',
    dispatch: 'Pick up', status: 'Pending',
  },
  {
    orderNo: '31003995178', date: '29/06/2026', total: 988.00, name: 'Hunter, Ben',
    dispatch: 'Delivery', status: 'Pending',
  },
  {
    orderNo: '31003994944', date: '29/06/2026', total: 992.00, name: 'Jackson, Jardine',
    dispatch: 'Pick up', status: 'Completed',
  },
  {
    orderNo: '31003994171', date: '29/06/2026', total: 229.00, name: 'GEORGE, KERINA',
    dispatch: 'Delivery', status: 'Completed',
  },
  {
    orderNo: '31003993953', date: '29/06/2026', total: 1562.00, name: 'Hodgson, Catherine',
    dispatch: 'Pick up', status: 'Completed',
  },
  {
    orderNo: '31003993078', date: '29/06/2026', total: 747.00, name: 'Bacon, Kylie',
    dispatch: 'Pick up', status: 'Pending',
  },
  {
    orderNo: '31003992413', date: '29/06/2026', total: 246.00, name: 'Beattie, Peter',
    dispatch: 'Delivery', status: 'Completed',
    salesOrderNo: '3303053', salesperson: '6131', completedDate: '29/06/2026',
    split: 'No', reroute: 'No', shipOption: 'EparcelExpress', shipRef: '33W4M0109235',
    orderCreated: '29/06/2026 10:30:32', addedInPos: '29/06/2026 10:34:42',
    paymentType: 'Credit Card', totalDelivery: 19.95, addressValidated: 'Yes',
    billing: { name: 'Peter Beattie', phone: '0421471195', email: 'rosalyn@greatcare.net.au' },
    delivery: { name: 'Peter Beattie', phone: '0421471195', address: '6 Gerald Street, Werribee VIC 3030' },
    notes: 'Payment type: Credit Card',
    progress: [
      { when: '29/06/2026 11:01:14', op: '6131 Dave M', text: 'Status changed to Shipped for product: EFC71631' },
      { when: '29/06/2026 10:59:16', op: '6131 Dave M', text: 'Status changed to Waiting Courier Manifest for product: EFC71631' },
      { when: '29/06/2026 10:58:15', op: '6131 Dave M', text: 'Generated.' },
    ],
    stock: {
      physicalSOH: 11, qtyNotAvailable: 1, stockOnSalesOrder: 0, notGenerated: 0,
      availableInStore: 10, stockOnPO: 0, totalAvailable: 10,
      dims: '56 x 34.8 x 33 CMT  0.064 MTQ  6.4 KGM',
    },
    items: [
      { product: 'EFC71631', description: 'Electrolux UltimateHome 700 Bagless Vacuum', qty: 1, total: 246.00, status: 'Booked Out', dept: '061', price: 246.00, delivery: 19.95 },
    ],
  },
  {
    orderNo: '31003992069', date: '29/06/2026', total: 666.00, name: 'Cooper, Taelor',
    dispatch: 'Pick up', status: 'Pending',
  },
  {
    orderNo: '31003991963', date: '29/06/2026', total: 488.00, name: 'Jewell, Duncan',
    dispatch: 'Delivery', status: 'Completed',
  },
  {
    orderNo: '31003991843', date: '29/06/2026', total: 1997.00, name: 'vong, maria',
    dispatch: 'Pick up', status: 'Completed',
  },
  {
    orderNo: '31003991751', date: '29/06/2026', total: 397.00, name: 'Nagi, Stephanie',
    dispatch: 'Delivery', status: 'Completed',
  },
];

// ─── Mock Undelivered Sales ──────────────────────────────────────────────────
// Mirrors the real terminal's Undelivered Sales screen (invoice list + products
// on the selected invoice + invoice/progress notes).
const MOCK_UNDELIVERED = [
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3300401', customer: 'NAOMI YOUNG',
    phone: '0411626279', status: 'Delivery Pending', invoiceDate: '21/06/26',
    customerExpected: '18/07/26', scanAtRisk: '',
    invoiceNotes: '', progressNotes: [],
    products: [],
  },
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3300541', customer: 'TARAN RANDHAWA',
    phone: '0434155755', status: 'Delivery Pending', invoiceDate: '21/06/26',
    customerExpected: '05/07/26', scanAtRisk: '',
    invoiceNotes: '', progressNotes: [],
    products: [],
  },
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3301998', customer: 'RAMAN DANDIWAL',
    phone: '0403074449', status: 'Delivery Pending', invoiceDate: '26/06/26',
    customerExpected: '27/07/26', scanAtRisk: '',
    invoiceNotes: '', progressNotes: [],
    products: [],
  },
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3302882', customer: 'NISHANTHI P SUBASINGHE NISHSHA…',
    phone: '0470704793', status: 'Delivery Pending', invoiceDate: '28/06/26',
    customerExpected: '30/06/26', scanSale: true, scanAtRisk: '28/12/2026',
    invoiceNotes: '$400 Lat HNGC\nAuth: 000199\n\nplease book dyson under sandra and book dryer under chami',
    progressNotes: [
      { initials: 'DG', when: '29/06/2026 18:02:48', op: '6043 DYLAN G', text: 'Customer contacted regarding delivery window.' },
    ],
    productNote: 'QA85QN80HAWXXY    SAMSUNG 85 4K NEOQLED QN80H AI SM\nStock to be picked or delivered from Store or Warehouse. Under Customer Expected Date.',
    products: [
      { line: 11, dept: '060', product: 'QA85QN80HAW…', description: 'SAMSUNG 85 4K NEOQLED QN80H AI…', qty: 1, soh: 20, avl: 14, soo: 0, sellPrice: 2180.00, type: 'STK', customerExpected: '30/06/26', delivery: '30/06/26' },
      { line: 12, dept: '060', product: '0Z0A9Z3060_4_FX', description: 'PRODUCT CARE REPLACE - 060 48 MTHS', qty: 1, soh: 0, avl: 0, soo: 0, sellPrice: 299.00, type: 'STK', customerExpected: '30/06/26', delivery: '' },
      { line: 13, dept: '061', product: 'WASHG1', description: 'DYSON WASHG1 WET CLEANER', qty: 1, soh: 2, avl: 0, soo: 0, sellPrice: 294.00, type: 'STK', customerExpected: '13/07/26', delivery: '' },
      { line: 14, dept: '061', product: '0Z0A9Z3061_2_FX', description: 'PRODUCT CARE REPLACE - 061 24 MTHS', qty: 1, soh: 0, avl: 0, soo: 0, sellPrice: 54.00, type: 'STK', customerExpected: '13/07/26', delivery: '' },
      { line: 15, dept: '070', product: 'DH8060J5', description: 'F&P SERIES 5 HPD 8KG WHITE WOOLM…', qty: 1, soh: 5, avl: 1, soo: 8, sellPrice: 900.00, type: 'STK', customerExpected: '30/06/26', delivery: '30/06/26' },
      { line: 16, dept: '070', product: '0Z0A9Z3070_3_FX', description: 'PRODUCT CARE REPLACE - 070 36 MTHS', qty: 1, soh: 0, avl: 0, soo: 0, sellPrice: 199.00, type: 'STK', customerExpected: '30/06/26', delivery: '30/06/26' },
      { line: 17, dept: '060', product: 'GC_LATITUDE_400', description: 'LATITUDE PROMOTION BONUS GIFT C…', qty: 1, soh: 0, avl: 0, soo: 0, sellPrice: 0.00, type: 'Delivered', customerExpected: '', delivery: '' },
    ],
  },
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3303223', customer: 'JAVED NAJAFI',
    phone: '0450750248', status: 'Delivery Pending', invoiceDate: '29/06/26',
    customerExpected: '14/07/26', scanAtRisk: '',
    invoiceNotes: '', progressNotes: [],
    products: [],
  },
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3303419', customer: 'GURPREET SINGH',
    phone: '0430462817', status: 'Delivery Pending', invoiceDate: '29/06/26',
    customerExpected: '04/07/26', scanSale: true, scanAtRisk: '28/12/2026',
    invoiceNotes: '', progressNotes: [],
    products: [],
  },
  {
    salesPerson: '1979-MIKAEL', invoiceNo: '3300538', customer: 'ROHIT SHARMA',
    phone: '0477770029', status: 'Pickup Pending', invoiceDate: '21/06/26',
    customerExpected: '11/07/26', scanAtRisk: '',
    invoiceNotes: '', progressNotes: [],
    products: [],
  },
];

// ─── Mock Customer Service Tickets ───────────────────────────────────────────
// Mirrors the real terminal's Customer Service Tickets screen (ticket list +
// detail pane: customer summary, ticket details, product, history log).
const MOCK_CS_TICKETS = [
  {
    ticketNo: '21274', state: 'Critical', source: 'Phone', type: 'Faulty',
    priority: 'High', status: 'Follow Supplier Framework', movex: 'L3M',
    subject: 'NO POWER TO SOUNDBAR', description: 'UNIT HAS NO POWER\nTROUBLESHOOTING ATTEMPTED',
    invoiceNo: '3264114', trn: '7240933', altInvoice: false, ticketAge: 94,
    productCode: 'JBLBAR800M2BLK', productName: 'JBL BAR 800MK2 7.1 - BLACK', dept: '060', qty: 1,
    assignedTo: '5450-JORDEN', salesPerson: '1979-MIKAEL', franchise: '13660',
    raised: '27/03/26 16:23:17', raisedBy: '5450', lastContact: '27/03/26 16:27:00',
    lastUpdate: '27/03/26 16:27:00', resolved: '', resolvedBy: '0',
    customer: { name: 'CHEUSI WAMENYA', address: '21 BUSH ST\nMANOR LAKES VIC 3024', mobile: '0473155213', email: 'WAMNEYACHEUSI@GMAIL.COM' },
    product: {
      bookedOut: '07/12/25', bookedAgo: '110 days ago', brand: 'JBL', group: '060AUDHTR1SB',
      supplier: '506361  INGRAM MICRO PTY LTD', supplierPhone: '02 9381 6000', supplierFax: '1300362103',
      faultType: 'Power Issue, Not Turning on. NO POWER TO SOUNDBAR', installed: 'Self Installed',
      serial: 'RS0310-GP0001163', location: 'Store - Retail', condition: 'Like New.',
      faultObserved: 'Yes. TESTED UNIT IN STORE NO POWER TO BAR',
    },
    warranty: { period: '24 Mths', startDate: '07/12/25', status: 'Warranty Current' },
    history: [
      '27/03/26 16:23:17 User:5450 New Ticket raised by 5450.',
      '27/03/26 16:23:29 User:5450 Type changed to Faulty',
      '27/03/26 16:23:29 User:5450 Priority changed to High',
      '27/03/26 16:23:43 User:5450 Additional warranty option was declined.',
      '27/03/26 16:23:43 User:5450 No Product Replacement policy for 060AUDHTR1SB.',
      '27/03/26 16:24:15 User:5450 Resolution goal within for 060AUD is 5 days.',
      '27/03/26 16:24:15 User:5450 Edit Customer: CHEUSI WAMENYA',
      '27/03/26 16:24:16 User:5450 Customer 2028882 retrieved',
      '27/03/26 16:26:40 User:5450 Faulty Product - Follow the supplier framework for a Faulty product that is older than 90 days but still within the express warranty period.',
      '27/03/26 16:26:40 User:5450 Status changed to Follow Supplier Framework',
      '27/03/26 16:26:55 User:5450 Email Contact - Subject: Confirmation of Your Query: 01-136-21274',
      '27/03/26 16:27:00 User:5450 SMS sent - From: HarveyN, To: +61473155213, Subject: Hi Cheusi! Your new Customer Service Ticket Number is 01-136-21274. We\u2019ll share updates soon. Thanks.',
    ],
  },
  {
    ticketNo: '21439', state: 'Critical', source: 'In Store', type: 'Faulty',
    priority: 'High', status: 'Follow Product Care', movex: 'L3M',
    subject: 'VS20A95993B HAVING ISSUES WITH CHARGING', description: 'VS20A95993B HAVING ISSUES WITH CHARGING HEAD SNAPED OFF',
    invoiceNo: '1914131', trn: '5088223', altInvoice: false, ticketAge: 79,
    productCode: 'VS20A95993B', productName: 'SAMSUNG BESPOKE JET ELITE EXTRA', dept: '060', qty: 1,
    assignedTo: '1378-PARSA', salesPerson: '1378-PARSA', franchise: '13660',
    raised: '11/04/26 11:13:56', raisedBy: '1378', lastContact: '29/06/26 12:07:49',
    lastUpdate: '29/06/26 12:07:49', resolved: '', resolvedBy: '0',
    customer: { name: 'PARSA CUSTOMER', address: '—', mobile: '—', email: '—' },
    product: {
      bookedOut: '—', bookedAgo: '', brand: 'SAMSUNG', group: '060FLRCARE',
      supplier: '—', supplierPhone: '—', supplierFax: '—',
      faultType: 'Charging head snapped off', installed: 'Self Installed',
      serial: '—', location: 'Store - Retail', condition: '—', faultObserved: '—',
    },
    warranty: { period: '24 Mths', startDate: '—', status: 'Warranty Current' },
    history: ['11/04/26 11:13:56 User:1378 New Ticket raised by 1378.'],
  },
  {
    ticketNo: '21479', state: 'Critical', source: 'In Store', type: 'Faulty',
    priority: 'High', status: 'Follow Supplier Framework', movex: 'L3M',
    subject: 'f25ultra unit having issues with suction', description: 'f25ultra unit having issues with suction roller head not spinning and wheels wont move forwards only backwards',
    invoiceNo: '3262927', trn: '7238859', altInvoice: false, ticketAge: 76,
    productCode: 'F25ULTRA', productName: 'ROBOROCK F25 ULTRA STEAM FLOOR CLEANER', dept: '060', qty: 1,
    assignedTo: '1378-PARSA', salesPerson: '1378-PARSA', franchise: '13660',
    raised: '14/04/26 10:37:58', raisedBy: '1378', lastContact: '22/05/26 16:11:09',
    lastUpdate: '22/05/26 16:11:09', resolved: '', resolvedBy: '0',
    customer: { name: 'ROBOROCK CUSTOMER', address: '—', mobile: '—', email: '—' },
    product: {
      bookedOut: '—', bookedAgo: '', brand: 'ROBOROCK', group: '060FLRCARE',
      supplier: '—', supplierPhone: '—', supplierFax: '—',
      faultType: 'Suction roller head not spinning', installed: 'Self Installed',
      serial: '—', location: 'Store - Retail', condition: '—', faultObserved: '—',
    },
    warranty: { period: '24 Mths', startDate: '—', status: 'Warranty Current' },
    history: ['14/04/26 10:37:58 User:1378 New Ticket raised by 1378.'],
  },
  {
    ticketNo: '21615', state: 'In Progress', source: 'Phone', type: 'Faulty',
    priority: 'High', status: 'Follow Supplier Framework', movex: 'L3M',
    subject: 'Philips NeoPix 750', description: 'Neopix 750 Smart Projector',
    invoiceNo: '3487848', trn: '', altInvoice: true, ticketAge: 64,
    productCode: 'PH-N-SMART750', productName: 'PHILIPS NEOPIX 750 SMART PROJECTOR-WHITE', dept: '060', qty: 1,
    assignedTo: '1111-ASH DULLAR', salesPerson: '1111-ASH', franchise: '13660',
    raised: '26/04/26 12:07:51', raisedBy: '1111', lastContact: '23/06/26 09:29:52',
    lastUpdate: '23/06/26 09:29:52', resolved: '', resolvedBy: '0',
    customer: { name: 'PHILIPS CUSTOMER', address: '—', mobile: '—', email: '—' },
    product: {
      bookedOut: '—', bookedAgo: '', brand: 'PHILIPS', group: '060AUDVIS',
      supplier: '—', supplierPhone: '—', supplierFax: '—',
      faultType: '—', installed: 'Self Installed',
      serial: '—', location: 'Store - Retail', condition: '—', faultObserved: '—',
    },
    warranty: { period: '24 Mths', startDate: '—', status: 'Warranty Current' },
    history: ['26/04/26 12:07:51 User:1111 New Ticket raised by 1111.'],
  },
  {
    ticketNo: '21689', state: 'Critical', source: 'Phone', type: 'Faulty',
    priority: 'High', status: 'Waiting for Third Party', movex: 'L3M',
    subject: 'Washer Noise Issues', description: 'Advised by customer washing machine makes absurdley loud noise when spinning',
    invoiceNo: '1872754', trn: '4982997', altInvoice: false, ticketAge: 57,
    productCode: 'FWEB9002IG', productName: 'WHIRLPOOL GREY 9KG/1400RPM FRONT LOADER', dept: '070', qty: 1,
    assignedTo: '3021-DRAGOMIR', salesPerson: '3021-DRAGOMIR', franchise: '13660',
    raised: '03/05/26 16:09:27', raisedBy: '3021', lastContact: '25/06/26 13:15:00',
    lastUpdate: '25/06/26 13:15:00', resolved: '', resolvedBy: '0',
    customer: { name: 'WHIRLPOOL CUSTOMER', address: '—', mobile: '—', email: '—' },
    product: {
      bookedOut: '—', bookedAgo: '', brand: 'WHIRLPOOL', group: '070LAUNDRY',
      supplier: '—', supplierPhone: '—', supplierFax: '—',
      faultType: 'Loud noise when spinning', installed: 'Self Installed',
      serial: '—', location: 'Store - Retail', condition: '—', faultObserved: '—',
    },
    warranty: { period: '24 Mths', startDate: '—', status: 'Warranty Current' },
    history: ['03/05/26 16:09:27 User:3021 New Ticket raised by 3021.'],
  },
  {
    ticketNo: '21734', state: 'Follow Up', source: 'In Store', type: 'Faulty',
    priority: 'High', status: 'Send for Assessment', movex: 'L3M',
    subject: 'Sony A500 soundbar', description: 'Soundbar faulty, doesn\u2019t turn on',
    invoiceNo: '1243997', trn: '', altInvoice: true, ticketAge: 52,
    productCode: 'HT-A5000', productName: 'SONY A5000 5.1.2CH DOLBY ATMOS SOUNDBAR', dept: '060', qty: 1,
    assignedTo: '6043-DYLAN', salesPerson: '6043-DYLAN', franchise: '13660',
    raised: '08/05/26 13:31:15', raisedBy: '6043', lastContact: '08/05/26 13:31:15',
    lastUpdate: '08/05/26 13:31:15', resolved: '', resolvedBy: '0',
    customer: { name: 'SONY CUSTOMER', address: '—', mobile: '—', email: '—' },
    product: {
      bookedOut: '—', bookedAgo: '', brand: 'SONY', group: '060AUDHTR1SB',
      supplier: '—', supplierPhone: '—', supplierFax: '—',
      faultType: 'Does not turn on', installed: 'Self Installed',
      serial: '—', location: 'Store - Retail', condition: '—', faultObserved: '—',
    },
    warranty: { period: '24 Mths', startDate: '—', status: 'Warranty Current' },
    history: ['08/05/26 13:31:15 User:6043 New Ticket raised by 6043.'],
  },
];

// Dropdown option sets for the New Ticket dialog (mirrors the real terminal).
const CST_SOURCES   = ['Phone', 'In Store', 'Email', 'Online'];
const CST_TYPES     = ['Faulty', 'Change of Mind', 'Warranty', 'Enquiry', 'Damaged'];
const CST_PRIORITIES = ['High', 'Medium', 'Low'];
const CST_STATUSES  = ['Open', 'Follow Supplier Framework', 'Follow Product Care', 'Waiting for Third Party', 'Send for Assessment', 'Resolved'];

// ─── Mock Quotations ─────────────────────────────────────────────────────────
// Mirrors the real terminal's Quotations screen (summary tallies + quotation
// list + products on the selected quotation + progress notes).
const MOCK_QUOTATIONS = [
  {
    quotationNo: '3261400', status: 'Expired', salesPerson: '1979-MIKAEL',
    customer: 'RICHA GANDHI', created: '28/11/25', expiry: '01/12/25',
    contact: 'Yes', lastModify: '28/11/25', lastUpdate: '28/11/25',
    followUp: 'Monthly', total: 16116.65,
    progressNotes: [],
    products: [
      { line: 11, product: 'HRBF126B', description: 'HISENSE 124L BAR FRIDGE - BLACK', qty: 1, retail: 299.00, discount: 79.00, type: 'PROM', quoted: 220.00, total: 220.00, expires: '03/12/25', lead: 0, current: 272.00, sc: true },
      { line: 12, product: '0Z0A9Z3070_2_FX', description: 'PRODUCT CARE REPLACE - 070 24 MTHS', qty: 1, retail: 59.00, discount: 33.35, type: 'DISC', quoted: 25.65, total: 25.65, expires: '', lead: 0, current: 25.65, sc: false },
      { line: 13, product: 'SMS6HCB01A', description: 'BOSCH SERIES 6 FREESTANDING D/W - BLACK', qty: 1, retail: 1799.00, discount: 369.00, type: 'ONLP', quoted: 1430.00, total: 1430.00, expires: '12/12/25', lead: 0, current: 1449.00, sc: false },
      { line: 14, product: '0Z0A9Z3070_3_FX', description: 'PRODUCT CARE REPLACE - 070 36 MTHS', qty: 1, retail: 439.00, discount: 121.00, type: 'DISC', quoted: 318.00, total: 318.00, expires: '', lead: 0, current: 318.00, sc: false },
      { line: 15, product: 'HDW15F1B1', description: 'HAIER FREESTANDING DW SANITISE BLACK', qty: 1, retail: 949.00, discount: 334.00, type: 'PROM', quoted: 615.00, total: 615.00, expires: '03/12/25', lead: 0, current: 548.00, sc: true },
      { line: 17, product: '98C8K', description: 'TCL 98 C8K PREM QD MINI LED 4K GOOGLE TV', qty: 2, retail: 7999.00, discount: 3649.00, type: 'PROM', quoted: 4350.00, total: 8700.00, expires: '01/12/25', lead: 0, current: 4888.00, sc: true },
      { line: 21, product: 'VXT7-B2', description: 'SANUS LARGE TILT MOUNT 65 - 140', qty: 2, retail: 349.95, discount: 174.95, type: 'ONLP', quoted: 175.00, total: 350.00, expires: '12/12/25', lead: 0, current: 245.00, sc: true },
    ],
  },
];

// ─── Mock Online Quick Reservations ──────────────────────────────────────────
// Mirrors the real terminal's Online Quick Reservations screen (reservation
// list + linked customer + reservation items + product inventory/notes).
const MOCK_RESERVATIONS = [
  {
    resNo: 'R22390906', status: 'Reserved', created: '27/06/2026 20:55:19',
    resTotal: 587.00, surname: 'Li', pickingSlip: '', completedDate: '', custNumber: '0431325777',
    customer: { phone: '0431325777', name: 'Yan Li', email: 'liyan77353099@gmail.com', address: '12 Sayers Rd, Hoppers Crossing VIC 3029' },
    progressNotes: [],
    items: [
      {
        onlineProduct: 'V10KONICAL', onlineDescription: 'Dyson V10 Konical Cordless', onlineQty: 1, onlineTotal: 587.00,
        dept: '061', posProduct: 'V10KONICAL', posDescription: 'DYSON V10 KONICAL', posQty: 1.00,
        price: 587.00, total: 587.00, typeAlloc: 'STK/S/P', expectedDate: '',
        inventory: { soh: 8, soo: 0, customerOrders: 2, naForSale: 1, totalAvailable: 5 },
        notes: 'SAVE $210',
      },
    ],
  },
  {
    resNo: 'R22391060', status: 'Reserved', created: '29/06/2026 10:33:16',
    resTotal: 792.00, surname: 'Barrett', pickingSlip: '', completedDate: '', custNumber: '0402662986',
    customer: { phone: '0402662986', name: 'Barrett', email: '', address: '' },
    progressNotes: [],
    items: [],
  },
  {
    resNo: 'R22391207', status: 'Reserved', created: '30/06/2026 11:46:20',
    resTotal: 469.00, surname: 'Simpson', pickingSlip: '', completedDate: '', custNumber: '0415134436',
    customer: { phone: '0415134436', name: 'Simpson', email: '', address: '' },
    progressNotes: [],
    items: [],
  },
  {
    resNo: 'R22391231', status: 'Reserved', created: '30/06/2026 13:22:13',
    resTotal: 349.00, surname: 'Ramachandran', pickingSlip: '', completedDate: '', custNumber: '0450789344',
    customer: { phone: '0450789344', name: 'Ramachandran', email: '', address: '' },
    progressNotes: [],
    items: [],
  },
];

// ─── Mock Sales KPIs ─────────────────────────────────────────────────────────
// Top-line tiles shown across the KPI sub-screens.
const KPI_HEADLINE = {
  delivered: { salesRevenue: '$2,911.4K', netProfit: '24.3%', invoices: '3,429', averageSale: '$849.0', productsPerInvoice: '1.7', ofMonth: '100.0%' },
  written:   { salesRevenue: '$3,142.8K', netProfit: '23.1%', invoices: '3,610', averageSale: '$871.0', productsPerInvoice: '1.8', ofMonth: '100.0%' },
};

// Comparison heatmap — salespeople (rows) × metric columns (values are % of
// target). Separate delivered / written matrices; cells colour red→green.
const KPI_COMPARE_COLUMNS = [
  'Total Sales', '070', 'WHIRLPOOL', 'PROFORMA', '060', '061',
  'PC Hit Rate', 'PC GP%', 'PC Sales', '061COF', '061SMA', '061VAC',
];
const KPI_COMPARE_ROWS = {
  delivered: [
    { name: 'ABDUL - 6478',       v: [81.3, 76.7, 194.6, 0.0, null, null, 84.0, 107.5, 76.1, null, null, null] },
    { name: 'ASH DULLAR - 1111',  v: [71.2, null, null, null, 64.1, null, 77.4, 84.4, 62.0, null, null, null] },
    { name: 'CAMILLO - 8081',     v: [62.5, null, null, null, null, 57.4, 63.1, 135.5, 33.3, 44.9, 77.3, 59.2] },
    { name: 'CHAMI - 6117',       v: [103.3, 96.1, 85.7, 0.0, null, null, 56.3, 102.1, 66.0, null, null, null] },
    { name: 'DORINA - 6011',      v: [80.8, 73.7, 28.5, 0.0, null, null, 64.5, 113.7, 65.8, null, null, null] },
    { name: 'DRAGOMIR - 3021',    v: [158.7, 113.6, 87.1, 0.0, null, null, 154.2, 87.4, 259.9, null, null, null] },
    { name: 'DYLAN G - 6043',     v: [81.9, null, null, null, 60.3, null, 23.5, 103.1, 12.2, null, null, null] },
    { name: 'GAVIN - 2002',       v: [64.6, null, null, null, 58.3, null, 115.0, 91.4, 86.3, null, null, null] },
    { name: 'JAMES - 1503',       v: [67.9, null, null, null, null, 64.6, 76.6, 130.7, 54.5, 142.5, 64.9, 53.2] },
    { name: 'JESS - 8080',        v: [58.7, null, null, null, null, 57.3, 104.0, 98.7, 42.6, 78.5, 92.0, 51.4] },
    { name: 'JORDEN - 5450',      v: [158.7, 107.0, 15.7, 0.0, null, null, 48.7, 65.6, 48.2, null, null, null] },
    { name: 'MIKAEL - 1979',      v: [63.8, null, null, null, 58.2, null, 145.3, 76.7, 81.5, null, null, null] },
    { name: 'NIKI - 7611',        v: [110.6, null, null, null, null, 104.4, 150.7, 124.2, 149.7, 82.9, 102.1, 113.5] },
    { name: 'PAOLA - 6095',       v: [52.6, 50.3, 42.5, 0.0, null, null, 87.3, 120.0, 57.5, null, null, null] },
    { name: 'PARSA - 1378',       v: [63.3, null, null, null, null, 55.6, 133.3, 111.1, 76.4, 78.0, 40.4, 60.3] },
    { name: 'RENU - 1999',        v: [123.3, 119.8, 118.4, 0.0, null, null, 97.5, 98.5, 146.6, null, null, null] },
    { name: 'RICHIE - 4088',      v: [50.3, null, null, null, 49.5, null, 85.0, 54.4, 53.4, null, null, null] },
    { name: 'SANDRA - 8082',      v: [108.6, null, null, null, null, 107.9, 104.4, 133.6, 99.8, 118.7, 172.7, 76.2] },
    { name: 'SHAREEF - 2921',     v: [144.8, 137.7, 195.1, 0.0, null, 116.4, 116.4, 97.7, 197.7, null, null, null] },
  ],
  written: [
    { name: 'ABDUL - 6478',       v: [88.4, 82.1, 201.0, 0.0, null, null, 91.2, 110.3, 82.5, null, null, null] },
    { name: 'ASH DULLAR - 1111',  v: [78.0, null, null, null, 70.5, null, 82.9, 88.6, 68.4, null, null, null] },
    { name: 'CAMILLO - 8081',     v: [69.7, null, null, null, null, 63.8, 70.2, 141.0, 39.5, 51.2, 84.0, 65.1] },
    { name: 'CHAMI - 6117',       v: [111.0, 102.4, 92.3, 0.0, null, null, 62.7, 106.5, 72.8, null, null, null] },
    { name: 'DORINA - 6011',      v: [87.6, 80.2, 34.9, 0.0, null, null, 71.0, 118.4, 72.1, null, null, null] },
    { name: 'DRAGOMIR - 3021',    v: [166.2, 120.0, 93.7, 0.0, null, null, 160.8, 92.0, 268.4, null, null, null] },
    { name: 'DYLAN G - 6043',     v: [89.1, null, null, null, 67.0, null, 30.4, 108.7, 18.9, null, null, null] },
    { name: 'GAVIN - 2002',       v: [71.9, null, null, null, 64.8, null, 121.6, 96.2, 92.7, null, null, null] },
    { name: 'JAMES - 1503',       v: [74.6, null, null, null, null, 71.0, 82.8, 136.1, 60.9, 148.0, 71.2, 59.8] },
    { name: 'JESS - 8080',        v: [65.2, null, null, null, null, 63.9, 110.5, 103.4, 48.9, 84.8, 98.6, 57.7] },
    { name: 'JORDEN - 5450',      v: [166.1, 113.5, 22.0, 0.0, null, null, 55.2, 71.9, 54.6, null, null, null] },
    { name: 'MIKAEL - 1979',      v: [70.4, null, null, null, 64.7, null, 151.9, 82.4, 88.1, null, null, null] },
    { name: 'NIKI - 7611',        v: [117.2, null, null, null, null, 110.9, 157.0, 130.6, 156.2, 89.3, 108.6, 120.0] },
    { name: 'PAOLA - 6095',       v: [59.0, 56.8, 49.1, 0.0, null, null, 93.8, 126.4, 63.9, null, null, null] },
    { name: 'PARSA - 1378',       v: [69.9, null, null, null, null, 62.0, 139.8, 117.5, 82.8, 84.5, 46.9, 66.7] },
    { name: 'RENU - 1999',        v: [130.0, 126.3, 124.9, 0.0, null, null, 104.1, 105.0, 153.1, null, null, null] },
    { name: 'RICHIE - 4088',      v: [56.8, null, null, null, 56.0, null, 91.5, 60.9, 59.8, null, null, null] },
    { name: 'SANDRA - 8082',      v: [115.1, null, null, null, null, 114.4, 110.9, 140.1, 106.3, 125.2, 179.2, 82.6] },
    { name: 'SHAREEF - 2921',     v: [151.3, 144.2, 201.6, 0.0, null, 122.9, 122.9, 104.2, 204.2, null, null, null] },
  ],
};

// Salesperson targets — per-rep target vs actual, split delivered / written.
// "shouldBe" is the pro-rata month-to-date expectation; "mtd" is actual; pct = mtd/target.
const KPI_SALESPERSON_TARGETS = {
  delivered: [
    { name: 'DRAGOMIR - 3021', target: 145000, shouldBe: 145000, mtd: 230115, pct: 158.7 },
    { name: 'JORDEN - 5450',   target: 145000, shouldBe: 145000, mtd: 230115, pct: 158.7 },
    { name: 'SHAREEF - 2921',  target: 145000, shouldBe: 145000, mtd: 209960, pct: 144.8 },
    { name: 'RENU - 1999',     target: 130000, shouldBe: 130000, mtd: 160290, pct: 123.3 },
    { name: 'NIKI - 7611',     target: 120000, shouldBe: 120000, mtd: 132720, pct: 110.6 },
    { name: 'SANDRA - 8082',   target: 140000, shouldBe: 140000, mtd: 152040, pct: 108.6 },
    { name: 'CHAMI - 6117',    target: 130000, shouldBe: 130000, mtd: 134290, pct: 103.3 },
    { name: 'DYLAN G - 6043',  target: 125000, shouldBe: 125000, mtd: 102375, pct: 81.9 },
    { name: 'ABDUL - 6478',    target: 120000, shouldBe: 120000, mtd: 97560,  pct: 81.3 },
    { name: 'DORINA - 6011',   target: 110000, shouldBe: 110000, mtd: 88880,  pct: 80.8 },
    { name: 'JAMES - 1503',    target: 125000, shouldBe: 125000, mtd: 84875,  pct: 67.9 },
    { name: 'GAVIN - 2002',    target: 120000, shouldBe: 120000, mtd: 77520,  pct: 64.6 },
    { name: 'MIKAEL - 1979',   target: 135000, shouldBe: 135000, mtd: 86130,  pct: 63.8 },
    { name: 'PARSA - 1378',    target: 120000, shouldBe: 120000, mtd: 75960,  pct: 63.3 },
    { name: 'CAMILLO - 8081',  target: 110000, shouldBe: 110000, mtd: 68750,  pct: 62.5 },
    { name: 'JESS - 8080',     target: 120000, shouldBe: 120000, mtd: 70440,  pct: 58.7 },
    { name: 'PAOLA - 6095',    target: 110000, shouldBe: 110000, mtd: 57860,  pct: 52.6 },
    { name: 'RICHIE - 4088',   target: 110000, shouldBe: 110000, mtd: 55330,  pct: 50.3 },
  ],
  written: [
    { name: 'DRAGOMIR - 3021', target: 145000, shouldBe: 145000, mtd: 240990, pct: 166.2 },
    { name: 'JORDEN - 5450',   target: 145000, shouldBe: 145000, mtd: 240845, pct: 166.1 },
    { name: 'SHAREEF - 2921',  target: 145000, shouldBe: 145000, mtd: 219385, pct: 151.3 },
    { name: 'RENU - 1999',     target: 130000, shouldBe: 130000, mtd: 169000, pct: 130.0 },
    { name: 'NIKI - 7611',     target: 120000, shouldBe: 120000, mtd: 140640, pct: 117.2 },
    { name: 'SANDRA - 8082',   target: 140000, shouldBe: 140000, mtd: 161140, pct: 115.1 },
    { name: 'CHAMI - 6117',    target: 130000, shouldBe: 130000, mtd: 144300, pct: 111.0 },
    { name: 'DYLAN G - 6043',  target: 125000, shouldBe: 125000, mtd: 111375, pct: 89.1 },
    { name: 'ABDUL - 6478',    target: 120000, shouldBe: 120000, mtd: 106080, pct: 88.4 },
    { name: 'DORINA - 6011',   target: 110000, shouldBe: 110000, mtd: 96360,  pct: 87.6 },
    { name: 'JAMES - 1503',    target: 125000, shouldBe: 125000, mtd: 93250,  pct: 74.6 },
    { name: 'GAVIN - 2002',    target: 120000, shouldBe: 120000, mtd: 86280,  pct: 71.9 },
    { name: 'MIKAEL - 1979',   target: 135000, shouldBe: 135000, mtd: 95040,  pct: 70.4 },
    { name: 'PARSA - 1378',    target: 120000, shouldBe: 120000, mtd: 83880,  pct: 69.9 },
    { name: 'CAMILLO - 8081',  target: 110000, shouldBe: 110000, mtd: 76670,  pct: 69.7 },
    { name: 'JESS - 8080',     target: 120000, shouldBe: 120000, mtd: 78240,  pct: 65.2 },
    { name: 'PAOLA - 6095',    target: 110000, shouldBe: 110000, mtd: 64900,  pct: 59.0 },
    { name: 'RICHIE - 4088',   target: 110000, shouldBe: 110000, mtd: 62480,  pct: 56.8 },
  ],
};

// Department targets, split delivered / written.
const KPI_DEPARTMENT_TARGETS = {
  delivered: [
    { dept: '060 — Audio Visual',     target: 480000, actual: 511200, pct: 106.5 },
    { dept: '061 — Small Appliances', target: 320000, actual: 298400, pct: 93.3 },
    { dept: '070 — White Goods',      target: 560000, actual: 612080, pct: 109.3 },
    { dept: 'Product Care',           target: 95000,  actual: 88350,  pct: 93.0 },
    { dept: 'Whirlpool',              target: 64000,  actual: 71040,  pct: 111.0 },
    { dept: 'Proforma',               target: 40000,  actual: 28800,  pct: 72.0 },
  ],
  written: [
    { dept: '060 — Audio Visual',     target: 480000, actual: 537600, pct: 112.0 },
    { dept: '061 — Small Appliances', target: 320000, actual: 316800, pct: 99.0 },
    { dept: '070 — White Goods',      target: 560000, actual: 641200, pct: 114.5 },
    { dept: 'Product Care',           target: 95000,  actual: 93100,  pct: 98.0 },
    { dept: 'Whirlpool',              target: 64000,  actual: 76160,  pct: 119.0 },
    { dept: 'Proforma',               target: 40000,  actual: 32400,  pct: 81.0 },
  ],
};

// Sub-department contribution to a department's total sales, for the pie
// chart on the Department Targets tab. Only Electrical has a breakdown for
// now; values reuse the department actuals above so the two views agree.
// Browns = TVs/audio (AV), Whites = whitegoods, Smalls = small appliances.
const KPI_DEPT_MIX = {
  delivered: {
    Electrical: [
      { label: 'Whites — Whitegoods (070)',        value: 612080, color: '#0EA5E9' },
      { label: 'Browns — Audio Visual (060)',      value: 511200, color: '#2563EB' },
      { label: 'Smalls — Small Appliances (061)',  value: 298400, color: '#F59E0B' },
    ],
  },
  written: {
    Electrical: [
      { label: 'Whites — Whitegoods (070)',        value: 641200, color: '#0EA5E9' },
      { label: 'Browns — Audio Visual (060)',      value: 537600, color: '#2563EB' },
      { label: 'Smalls — Small Appliances (061)',  value: 316800, color: '#F59E0B' },
    ],
  },
};

// Store target — single rollup, split delivered / written.
const KPI_STORE_TARGET = {
  delivered: {
    monthTarget: 2750000, monthActual: 2911400, pct: 105.9,
    dayTarget: 95000, dayActual: 102300, dayPct: 107.7,
    netProfitTarget: 22.0, netProfitActual: 24.3,
    invoicesTarget: 3200, invoicesActual: 3429,
    avgSaleTarget: 820, avgSaleActual: 849,
  },
  written: {
    monthTarget: 2750000, monthActual: 3142800, pct: 114.3,
    dayTarget: 95000, dayActual: 108600, dayPct: 114.3,
    netProfitTarget: 22.0, netProfitActual: 23.1,
    invoicesTarget: 3200, invoicesActual: 3610,
    avgSaleTarget: 820, avgSaleActual: 871,
  },
};

// Per-salesperson KPI metrics — the logged-in rep's own targets, shown as
// gauge tiles (matches the real "My KPI's" card view). Keyed by operator code.
// Each metric: label, target, shouldBe, mtd (all $ unless pctMetric), pct.
const KPI_MY_METRICS = {
  delivered: {
    '1979': [
      { label: 'Total Sales', target: 145000, shouldBe: 145000, mtd: 92800, pct: 64.0 },
      { label: '060', target: 145000, shouldBe: 145000, mtd: 85000, pct: 58.0 },
      { label: 'Product Care Hit Rate', target: 30, shouldBe: 30, mtd: 44, pct: 44.0, pctMetric: true },
      { label: 'Product Care GP%', target: 35, shouldBe: 35, mtd: 27, pct: 27.0, pctMetric: true },
      { label: 'Product Care Sales', target: 7000, shouldBe: 7000, mtd: 6000, pct: 81.0 },
      { label: '060CTV', target: 113000, shouldBe: 113000, mtd: 72000, pct: 64.0 },
      { label: '060AUD', target: 23000, shouldBe: 23000, mtd: 11000, pct: 47.0 },
      { label: '060AUD BLUETOOTH', target: 897, shouldBe: 897, mtd: 2000, pct: 202.0 },
      { label: '060 ESSENTIALS AND CAB', target: 2000, shouldBe: 2000, mtd: 575, pct: 26.0 },
    ],
  },
  written: {
    '1979': [
      { label: 'Total Sales', target: 145000, shouldBe: 145000, mtd: 101500, pct: 70.0 },
      { label: '060', target: 145000, shouldBe: 145000, mtd: 92800, pct: 64.0 },
      { label: 'Product Care Hit Rate', target: 30, shouldBe: 30, mtd: 48, pct: 48.0, pctMetric: true },
      { label: 'Product Care GP%', target: 35, shouldBe: 35, mtd: 31, pct: 31.0, pctMetric: true },
      { label: 'Product Care Sales', target: 7000, shouldBe: 7000, mtd: 6300, pct: 90.0 },
      { label: '060CTV', target: 113000, shouldBe: 113000, mtd: 79000, pct: 70.0 },
      { label: '060AUD', target: 23000, shouldBe: 23000, mtd: 12600, pct: 55.0 },
      { label: '060AUD BLUETOOTH', target: 897, shouldBe: 897, mtd: 2200, pct: 220.0 },
      { label: '060 ESSENTIALS AND CAB', target: 2000, shouldBe: 2000, mtd: 700, pct: 35.0 },
    ],
  },
};
// Fallback metric set for any operator without bespoke data.
const KPI_MY_METRICS_DEFAULT = {
  delivered: [
    { label: 'Total Sales', target: 120000, shouldBe: 120000, mtd: 78000, pct: 65.0 },
    { label: '060', target: 90000, shouldBe: 90000, mtd: 54000, pct: 60.0 },
    { label: 'Product Care Hit Rate', target: 30, shouldBe: 30, mtd: 33, pct: 33.0, pctMetric: true },
    { label: 'Product Care GP%', target: 35, shouldBe: 35, mtd: 34, pct: 34.0, pctMetric: true },
    { label: 'Product Care Sales', target: 6000, shouldBe: 6000, mtd: 4200, pct: 70.0 },
  ],
  written: [
    { label: 'Total Sales', target: 120000, shouldBe: 120000, mtd: 85200, pct: 71.0 },
    { label: '060', target: 90000, shouldBe: 90000, mtd: 59400, pct: 66.0 },
    { label: 'Product Care Hit Rate', target: 30, shouldBe: 30, mtd: 36, pct: 36.0, pctMetric: true },
    { label: 'Product Care GP%', target: 35, shouldBe: 35, mtd: 35, pct: 35.0, pctMetric: true },
    { label: 'Product Care Sales', target: 6000, shouldBe: 6000, mtd: 4560, pct: 76.0 },
  ],
};

// Year-over-year growth — any month vs the same month in prior years (up to
// 10 years back). The June anchors below are the real mock figures; every
// other month is derived deterministically from them (seasonal weighting +
// a small per-year offset) so the month picker always has data. When SAP
// integration lands, kpiGrowthFor() becomes a straight backend lookup.
const KPI_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

// Seasonal weighting relative to June (index 0 = January). Nov/Dec run hot
// (Black Friday / Christmas), Jan–Feb run soft — typical AU retail shape.
const KPI_SEASONAL = [0.86, 0.79, 0.92, 0.88, 0.94, 1.00, 0.97, 0.90, 0.95, 1.02, 1.18, 1.32];

// "Data as at" anchor for the mock: June 2026 is the latest complete month,
// so months after June have no 2026 row yet.
// Security screensaver: lock the terminal after this much inactivity.
const LOCK_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

const KPI_DATA_YEAR = 2026;
const KPI_LATEST_COMPLETE_MONTH = 5; // June

const KPI_GROWTH_BASE = {
  delivered: [
    { year: 2026, revenue: 2911400 },
    { year: 2025, revenue: 2684300 },
    { year: 2024, revenue: 2503900 },
    { year: 2023, revenue: 2438600 },
    { year: 2022, revenue: 2190400 },
    { year: 2021, revenue: 1985700 },
    { year: 2020, revenue: 1642300 },
    { year: 2019, revenue: 1876500 },
    { year: 2018, revenue: 1731200 },
    { year: 2017, revenue: 1598800 },
  ],
  written: [
    { year: 2026, revenue: 3142800 },
    { year: 2025, revenue: 2871900 },
    { year: 2024, revenue: 2662400 },
    { year: 2023, revenue: 2571000 },
    { year: 2022, revenue: 2298700 },
    { year: 2021, revenue: 2074500 },
    { year: 2020, revenue: 1701800 },
    { year: 2019, revenue: 1954300 },
    { year: 2018, revenue: 1802600 },
    { year: 2017, revenue: 1653900 },
  ],
};

// Deterministic ±5% offset so months don't scale identically year-to-year
// (keeps the growth % column interesting). Pure function of year + month, so
// values are stable across renders and sessions.
const kpiJitter = (year, monthIdx) => 1 + (((year * 7 + monthIdx * 13) % 11) - 5) / 100;

// Revenue-by-year series for a given sales type and month (newest first).
// Excludes the current year for months that haven't completed yet.
const kpiGrowthFor = (type, monthIdx) =>
  KPI_GROWTH_BASE[type]
    .filter((g) => !(g.year === KPI_DATA_YEAR && monthIdx > KPI_LATEST_COMPLETE_MONTH))
    .map((g) => ({
      year: g.year,
      revenue: monthIdx === 5 ? g.revenue : Math.round(g.revenue * KPI_SEASONAL[monthIdx] * kpiJitter(g.year, monthIdx)),
    }));

// Full 12-month series for one year (for the Monthly Trend strip). Months
// beyond the latest complete month in the current year return null.
const kpiMonthlyFor = (type, year) => {
  const base = KPI_GROWTH_BASE[type].find((g) => g.year === year);
  if (!base) return [];
  return KPI_MONTHS.map((_, m) => {
    if (year === KPI_DATA_YEAR && m > KPI_LATEST_COMPLETE_MONTH) return null;
    return m === 5 ? base.revenue : Math.round(base.revenue * KPI_SEASONAL[m] * kpiJitter(year, m));
  });
};

// KPI screen sub-menu tabs (hoisted to module scope — static, no reason to
// rebuild the array on every App render).
const KPI_TABS = [
  { id: 'salesperson', label: 'Salesperson Targets' },
  { id: 'department', label: 'Department Targets' },
  { id: 'store', label: 'Store Targets' },
  { id: 'rankings', label: 'Rankings' },
  { id: 'comparison', label: 'Comparison' },
  { id: 'growth', label: 'YoY Growth' },
];


// Keep clock updates isolated so the full POS does not re-render every second.
// ─── App-wide default: Enter advances to the next field ────────────────────
// Rather than wiring a ref chain for every new form (firstName -> lastName ->
// email -> ...), this is attached once via onKeyDown on a form's wrapping
// <div>/<form> and uses React's event delegation to catch Enter from any
// input/select/textarea inside it. It walks the DOM in visual order, so field
// order always matches what's on screen without needing manual refs.
//
// Opt-outs, by design:
//   - data-enter-skip="true"   on a field: Enter does nothing special there
//     (the field's own onKeyDown, if any, still runs first and can call
//     e.preventDefault() to stop this handler — e.g. the Browse / Customer
//     Search dialogs use their own Enter behaviour for mode-cycling/search).
//   - data-enter-submit="true" on a field: Enter calls onSubmit instead of
//     advancing — typically the last field in a form.
//   - <textarea> is skipped entirely: Enter should insert a newline there.
function handleEnterAdvance(e, onSubmit) {
  if (e.key !== 'Enter' || e.defaultPrevented) return;
  const el = e.target;
  if (!el || el.tagName === 'TEXTAREA') return;
  if (el.dataset && el.dataset.enterSkip === 'true') return;

  e.preventDefault();

  if (el.dataset && el.dataset.enterSubmit === 'true') {
    if (onSubmit) onSubmit();
    return;
  }

  const container = e.currentTarget;
  const focusable = Array.from(
    container.querySelectorAll('input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])')
  ).filter((node) => node.offsetParent !== null); // skip hidden fields

  const idx = focusable.indexOf(el);
  if (idx === -1) return;

  const next = focusable[idx + 1];
  if (next) {
    next.focus();
    if (next.tagName === 'INPUT' && typeof next.select === 'function') next.select();
  } else if (onSubmit) {
    // Last field in the form — Enter submits rather than doing nothing.
    onSubmit();
  }
}

function LiveClock({ type = 'time', uppercase = false }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const cadence = type === 'date' ? 60000 : 1000;
    let intervalId;
    const delay = cadence - (Date.now() % cadence);
    const timeoutId = setTimeout(() => {
      setNow(new Date());
      intervalId = setInterval(() => setNow(new Date()), cadence);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [type]);

  const value = type === 'date' ? DATE_FORMATTER.format(now) : TIME_FORMATTER.format(now);
  return uppercase ? value.toUpperCase() : value;
}

// Renders a label with its mnemonic letter bolded + underlined — mirrors the
// real terminal's underlined access-key convention (Esc=Exit, Search, etc).
// accessIndex picks which occurrence of accessKey to mark when a label has
// the letter more than once (e.g. the second "O" in "Sales/Orders").
function renderAccessLabel(label, accessKey, accessIndex = 0) {
  if (!accessKey) return label;
  const upper = label.toUpperCase();
  const target = accessKey.toUpperCase();
  let pos = -1;
  let from = 0;
  for (let i = 0; i <= accessIndex; i++) {
    pos = upper.indexOf(target, from);
    if (pos === -1) return label;
    from = pos + 1;
  }
  return (
    <>
      {label.slice(0, pos)}
      <span className="hn-access-key">{label[pos]}</span>
      {label.slice(pos + 1)}
    </>
  );
}

// ─── Product catalogue (mock) ───────────────────────────────────────────────
// A small stand-in catalogue so Product Browse is usable end-to-end and the
// Pricing Calculator (F4) has real products to price. Figures are per-unit.
// buyEx / fcEx are GST-exclusive; sellIncl is GST-inclusive. `npAvail` is the
// SAP-provided net-profit-available figure (rebate-inclusive); when absent the
// calculator falls back to sellEx − buyEx. When SAP is wired up this array is
// replaced by a live product lookup.
const MOCK_CATALOGUE = [
  {
    code: 'QA98QN90FAWXXY', description: 'SAMSUNG 98 QN90F NEOQLED 4K SMART AI TV', dept: '060', brand: 'SAMSUNG',
    soh: 4, avail: 2, onOrder: 2, range: 'C',
    buyEx: 6502.99, fcEx: 7964.86, sellIncl: 9995.00,
    bestBuy: 6502.99, bestBuySrc: 'Store', bestSell: 9995.00, bestSellSrc: 'Online',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17, npAvail: 2840.24,
    // Full Product Maintenance View data, transcribed from the live terminal.
    detail: {
      main: {
        supMaintained: 'Y', availableToSell: 'Y', status: 'Active', availableOnline: 'Y',
        articleNo: '12631836', localNo: '', secondDesc: '',
        franchisee: '13660', franchiseeName: 'Harvey Norman AVIT',
        group: '060CTVLED090', groupName: '97+',
        ranging: 'C', origin: 'VNM', originName: 'Viet Nam',
        nonDiminishing: 'N', productType: '', style: 'SAM-QN90F',
        costing: 'B', extraDetail: 'A', stickerShowsPrice: 'Y',
        supplierCode: '505676', supplierName: 'SAMSUNG ELECTRONICS AUSTRALIA P/L',
        brand: 'SAMSUNG', model: 'QA98QN90FAWXXY', suppProduct: 'QA98QN90FAWXXY',
        altSupplierCode: '', altSupplierName: '',
      },
      pricing: {
        invoiceCost: 6502.99, applyGst: '', gstRate: 10.00, trade: 0.00,
        internalRebate: 1331.81, internalRebatePct: 20.48,
        stFreight: 130.06, stFreightPct: 2.000,
        costEx: 7964.86, costIncl: 8761.35,
        marginAmt: 2488.78, gpPct: 23.808, marginPct: 31.247,
        salesRebates: 386.93, oaPurchaseRebates: 0.00, otherRebates: 1331.81,
        netProfit: 4207.52, netProfitPct: 40.249,
        recMinSell: 0.00, recSell: 11499.00, onlinePrice: 9995.00, storeSell: 11499.00,
        exclusive: false, onlineProduct: true,
        promo: 0.00, specialBuy: 0.00,
      },
      suppliers: [
        { code: '505676', name: 'SAMSUNG ELECTRONICS AUSTRALIA P/L', supProdCode: 'QA98QN90FAWXXY', reordQty: 1.00, active: 'Y', primary: 'Y' },
      ],
      barcodes: [
        { barcode: '8806095980119', uom: 'EA', description: 'Each', primary: 'Y', qty: 1.00, created: '07/03/2025 18:29:21' },
      ],
      purchasing: {
        replenishment: 'Recommended',
        staticMin: 0, staticMax: 0, storeReorderQty: 0,
        minWeeksCover: 0, maxWeeksCover: 0, minShelfHolding: 0, dynStoreReorderQty: 0,
        uom: 'EA', suppReorderQty: 1.00, purchaseConv: 0,
        packQty: 'N/A', suppCost: 'N/A', storeCost: 'N/A',
        stockConstrained: 'Y', localPO: 'N',
        inventory: { soh: 4, onOrder: 2, customerOrders: 1, notAvailable: 1, totalAvailable: 4 },
        salesRollup: [
          { label: 'Week to Date', qty: 0, avg: 0, gp: 0 },
          { label: 'Month to Date', qty: 0, avg: 0, gp: 0 },
          { label: 'Total Last Month', qty: 0, avg: 0, gp: 0 },
          { label: 'Total Last 3 Mths', qty: 3, avg: 7751.33, gp: -13.03 },
          { label: 'Total Last 6 Mths', qty: 6, avg: 6831.67, gp: -28.25 },
          { label: 'Total Last 12 Mths', qty: 15, avg: 6493.53, gp: -34.75 },
        ],
        avgWeeklyDemand: 0,
        leadTime: { m3: 16, m6: 15, m12: 15 },
      },
      specialControls: {
        location: '', noDiscounting: 'N', weightRequired: 'N', productWeight: 0,
        labelFormat: 0, hideSellPrice: 'N',
        length: 275, width: 2370, height: 1420, sizeUom: 'MMT',
        volume: 0.925, volumeUom: 'MTQ', grossWeight: 92.7, weightUom: 'KGM',
        warrantyMonths: 12, warrantyType: 'R1', productProtection: 'Y', qtyInBins: 1.00,
      },
      discounts: [8461, 8976, 8976, 8976, 7761, 7763, 6282, 5996, 5996, 5996, 5996, 6282, 8861, 8864, 8864, 8864, 8332, 8332, 8332, 8332, 8461, 7992]
        .map((v) => ({ type: 'D$R', value: v })),
      salesHistory: {
        lastSale: '08/05/2026', lastPurchase: '10/06/2026', asAt: '02/07/2026',
        months: [
          { m: 'January',   sales: 10805.46, gp: -5124.26,  qty: 2, purch: 15929.72, pQty: 2 },
          { m: 'February',  sales: 0,        gp: 0,         qty: 0, purch: 15929.72, pQty: 2 },
          { m: 'March',     sales: 5318.18,  gp: -2646.68,  qty: 1, purch: 7964.86,  pQty: 1 },
          { m: 'April',     sales: 13867.27, gp: -2062.45,  qty: 2, purch: 31859.44, pQty: 4 },
          { m: 'May',       sales: 7272.73,  gp: -692.13,   qty: 1, purch: 0,        pQty: 0 },
          { m: 'June',      sales: 0,        gp: 0,         qty: 0, purch: 0,        pQty: 0 },
          { m: 'July',      sales: 0,        gp: 0,         qty: 0, purch: 39824.30, pQty: 5 },
          { m: 'August',    sales: 6862.73,  gp: -1102.13,  qty: 1, purch: 7964.86,  pQty: 1 },
          { m: 'September', sales: 0,        gp: 0,         qty: 0, purch: 7964.86,  pQty: 1 },
          { m: 'October',   sales: 0,        gp: 0,         qty: 0, purch: 0,        pQty: 0 },
          { m: 'November',  sales: 17275.45, gp: -6619.13,  qty: 3, purch: 0,        pQty: 0 },
          { m: 'December',  sales: 27146.38, gp: -12527.92, qty: 5, purch: 23894.58, pQty: 3 },
        ],
      },
    },
  },
  {
    code: 'QA77S90FAEXXY', description: 'SAMSUNG 77 S90F OLED 4K SMART AI TV', dept: '060', brand: 'SAMSUNG',
    soh: 5, avail: 4, onOrder: 2, range: 'A',
    buyEx: 2618.18, fcEx: 3050.00, sellIncl: 4195.00,
    bestBuy: 2618.18, bestBuySrc: 'Store', bestSell: 4195.00, bestSellSrc: 'Online',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
  {
    code: 'JBLBAR800M2BLK', description: 'JBL BAR 800MK2 7.1 - BLACK', dept: '060', brand: 'JBL',
    soh: 12, avail: 10, onOrder: 0, range: 'A',
    buyEx: 812.50, fcEx: 947.20, sellIncl: 1495.00,
    bestBuy: 812.50, bestBuySrc: 'Store', bestSell: 1495.00, bestSellSrc: 'Online',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
  {
    code: 'HT-A5000', description: 'SONY A5000 5.1.2CH DOLBY ATMOS SOUNDBAR', dept: '060', brand: 'SONY',
    soh: 8, avail: 7, onOrder: 2, range: 'B',
    buyEx: 545.45, fcEx: 636.00, sellIncl: 995.00,
    bestBuy: 545.45, bestBuySrc: 'Store', bestSell: 995.00, bestSellSrc: 'Supplier',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
  {
    code: 'VS20A95993B', description: 'SAMSUNG BESPOKE JET ELITE EXTRA', dept: '061', brand: 'SAMSUNG',
    soh: 15, avail: 13, onOrder: 5, range: 'A',
    buyEx: 654.55, fcEx: 763.00, sellIncl: 1195.00,
    bestBuy: 654.55, bestBuySrc: 'Store', bestSell: 1195.00, bestSellSrc: 'Online',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
  {
    code: 'F25ULTRA', description: 'ROBOROCK F25 ULTRA STEAM FLOOR CLEANER', dept: '061', brand: 'ROBOROCK',
    soh: 9, avail: 8, onOrder: 3, range: 'B',
    buyEx: 763.64, fcEx: 890.00, sellIncl: 1399.00,
    bestBuy: 763.64, bestBuySrc: 'Store', bestSell: 1399.00, bestSellSrc: 'Online',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
  {
    code: 'PH-N-SMART750', description: 'PHILIPS NEOPIX 750 SMART PROJECTOR-WHITE', dept: '060', brand: 'PHILIPS',
    soh: 4, avail: 4, onOrder: 0, range: 'C',
    buyEx: 545.45, fcEx: 636.00, sellIncl: 999.00,
    bestBuy: 545.45, bestBuySrc: 'Store', bestSell: 999.00, bestSellSrc: 'Online',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
  {
    code: 'FWEB9002IG', description: 'WHIRLPOOL GREY 9KG/1400RPM FRONT LOADER', dept: '070', brand: 'WHIRLPOOL',
    soh: 6, avail: 5, onOrder: 2, range: 'A',
    buyEx: 872.73, fcEx: 1018.00, sellIncl: 1599.00,
    bestBuy: 872.73, bestBuySrc: 'Store', bestSell: 1599.00, bestSellSrc: 'Store',
    recMin: 0, exclusive: false, commPct: 10, keptPct: 17,
  },
];

// Seed the calculator's editable field set (all strings) from a catalogue row.
function pricingSeed(p) {
  const n = (v, dp = 2) => (isFinite(Number(v)) ? Number(v) : 0).toFixed(dp);
  const sellEx = (Number(p.sellIncl) || 0) / 1.1;
  const npDefault = Math.round((sellEx - (Number(p.buyEx) || 0)) * 100) / 100;
  const npSeed = p.npAvail != null ? Number(p.npAvail) : npDefault;
  // Fixed dollar gap between (Sell ex − Buy ex) and the catalogue NP figure —
  // overheads and rebates. Deriving it here means live NP tracks the deal
  // while still matching the catalogue exactly at the catalogue price.
  const npGap = sellEx - (Number(p.buyEx) || 0) - npSeed;
  return {
    npGap,
    code: p.code || '',
    description: p.description || '',
    dept: p.dept || '',
    bestBuy: n(p.bestBuy != null ? p.bestBuy : p.buyEx),
    bestBuySrc: p.bestBuySrc || 'Store',
    bestSell: n(p.bestSell != null ? p.bestSell : p.sellIncl),
    bestSellSrc: p.bestSellSrc || 'Online',
    recMin: n(p.recMin != null ? p.recMin : 0),
    exclusive: !!p.exclusive,
    buyEx: n(p.buyEx),
    fcEx: n(p.fcEx),
    sellIncl: n(p.sellIncl),
    disc: '0.00',
    discPct: '0.000',
    commPct: n(p.commPct != null ? p.commPct : 10, 3),
    keptPct: n(p.keptPct != null ? p.keptPct : 17, 3),
    npAvail: n(npSeed),
    sp: '0.00',
  };
}

// ─── Pricing Calculator ─────────────────────────────────────────────────────
// Modern rebuild of the legacy PosWin "Pricing Calculator". Opens on F4 from
// Product Browse for the highlighted product. Every box is editable; all
// derived figures recompute live. Verified against the legacy screen:
//   FC(incl) = FC(ex) × 1.1
//   Net Sell(incl) = Sell(incl) − Discount$      Sell(ex) = Net Sell(incl) / 1.1
//   M$  = Sell(ex) − FC(ex)     GP% = M$/Sell(ex)     M% = M$/FC(ex)
//   NP$ = Sell(ex) − Buy(ex) − Gap   (Gap = fixed overheads/rebates from seed,
//                                     so NP re-derives whenever the deal moves)
//   NP% = NP$/Sell(ex)          Kept$ = Sell(ex) × Kept%
//   EST C$ = Comm% × (NP$ − Kept$)    TC$ = EST C$ + SP$   (floored at $0)
function PricingCalculatorPanel({ product, onClose }) {
  const [f, setF] = useState(() => pricingSeed(product));
  useEffect(() => { setF(pricingSeed(product)); }, [product]);

  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(20, (window.innerWidth - 780) / 2),
    y: Math.max(16, (window.innerHeight - 620) / 4),
  }));

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const num = (v) => { const x = parseFloat(String(v).replace(/,/g, '')); return isFinite(x) ? x : 0; };
  const fmt = (n, dp = 2) => n.toLocaleString('en-AU', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  const GST = 1.1;

  // NP Available follows the live deal: NP = Net Sell(ex) − Buy(ex) − Gap.
  // Previously NP stayed frozen at the catalogue figure while Kept$ scaled
  // with the sell price, so a $1 sale paid MORE commission than a $9,995 one
  // and a high sale paid none. The field stays editable — a manual NP holds
  // until the sell price, discount or buy price move again.
  const deriveNp = (p, sellIncl, disc, buyExV) => {
    const netEx = Math.max(0, num(sellIncl) - num(disc)) / GST;
    return (netEx - num(buyExV) - (Number(p.npGap) || 0)).toFixed(2);
  };

  // Discount and sell interact, so their setters keep $/% reconciled — and
  // every deal-shaping change re-derives NP.
  const setSell = (v) => setF((p) => {
    const s = num(v); const d = num(p.disc);
    return { ...p, sellIncl: v, discPct: s > 0 ? (d / s * 100).toFixed(3) : '0.000', npAvail: deriveNp(p, v, p.disc, p.buyEx) };
  });
  const setDiscDollars = (v) => setF((p) => {
    const s = num(p.sellIncl); const d = num(v);
    return { ...p, disc: v, discPct: s > 0 ? (d / s * 100).toFixed(3) : '0.000', npAvail: deriveNp(p, p.sellIncl, v, p.buyEx) };
  });
  const setDiscPct = (v) => setF((p) => {
    const s = num(p.sellIncl); const pct = num(v);
    const d = (s * pct / 100).toFixed(2);
    return { ...p, discPct: v, disc: d, npAvail: deriveNp(p, p.sellIncl, d, p.buyEx) };
  });
  const setBuyEx = (v) => setF((p) => ({ ...p, buyEx: v, npAvail: deriveNp(p, p.sellIncl, p.disc, v) }));

  // ---- Live computation ----
  const buyEx = num(f.buyEx);
  const fcEx = num(f.fcEx);
  const fcIncl = fcEx * GST;
  const sellGross = num(f.sellIncl);
  const disc = num(f.disc);
  const netSellIncl = Math.max(0, sellGross - disc);
  const sellEx = netSellIncl / GST;
  const mDollars = sellEx - fcEx;
  const gpPct = sellEx > 0 ? (mDollars / sellEx) * 100 : 0;
  const mPct = fcEx > 0 ? (mDollars / fcEx) * 100 : 0;
  const npAvail = num(f.npAvail);
  const npPct = sellEx > 0 ? (npAvail / sellEx) * 100 : 0;
  const keptPct = num(f.keptPct);
  const keptDollars = sellEx * keptPct / 100;
  const commPct = num(f.commPct);
  const estC = Math.max(0, (npAvail - keptDollars) * commPct / 100);
  const sp = num(f.sp);
  const tc = estC + sp;

  const marginHealthy = gpPct >= 12;

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    e.stopPropagation(); // keep typing digits from reaching Browse's row/keys
  };

  // Small render helpers (plain functions → stable input identity, no remount).

  return (
    <div className="hn-browse-overlay" style={{ zIndex: 1200 }}>
      <div
        className="hn-browse-dialog hn-fade-in"
        style={{ left: position.x + 'px', top: position.y + 'px', width: '780px' }}
        onKeyDown={onKeyDown}
      >
        {/* Header */}
        <div className="hn-browse-header" onMouseDown={handleDragStart} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span className="hn-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>
              Pricing Calculator · F4
            </span>
            <span className="hn-pc-code hn-mono">{f.code}</span>
          </div>
          <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close">
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="hn-pc-body">
          {/* Product description */}
          <div className="hn-pc-desc">
            <span className="hn-pc-label">Product Description</span>
            <input
              className="hn-pc-in hn-pc-desc-in"
              value={f.description}
              onChange={(e) => set('description', e.target.value)}
              spellCheck={false}
            />
          </div>

          {/* Reference strip */}
          <div className="hn-pc-ref">
            <div className="hn-pc-ref-cell">
              <span className="hn-pc-label">Best Buy Price</span>
              <input className="hn-pc-in hn-mono" value={f.bestBuy} onChange={(e) => set('bestBuy', e.target.value)} inputMode="decimal" />
            </div>
            <div className="hn-pc-ref-cell">
              <span className="hn-pc-label">Source</span>
              <input className="hn-pc-in" value={f.bestBuySrc} onChange={(e) => set('bestBuySrc', e.target.value)} />
            </div>
            <div className="hn-pc-ref-cell">
              <span className="hn-pc-label">Best Sell Price</span>
              <input className="hn-pc-in hn-mono" value={f.bestSell} onChange={(e) => set('bestSell', e.target.value)} inputMode="decimal" />
            </div>
            <div className="hn-pc-ref-cell">
              <span className="hn-pc-label">Source</span>
              <input className="hn-pc-in" value={f.bestSellSrc} onChange={(e) => set('bestSellSrc', e.target.value)} />
            </div>
            <div className="hn-pc-ref-cell">
              <span className="hn-pc-label">Rec. Min.</span>
              <input className="hn-pc-in hn-mono" value={f.recMin} onChange={(e) => set('recMin', e.target.value)} inputMode="decimal" />
            </div>
            <label className="hn-pc-excl">
              <input type="checkbox" checked={f.exclusive} onChange={(e) => set('exclusive', e.target.checked)} />
              <span>Exclusive Product</span>
            </label>
          </div>

          {/* Two panels */}
          <div className="hn-pc-cols">
            {/* Cost & Margin */}
            <div className="hn-pc-panel">
              <div className="hn-pc-panel-head">Cost &amp; Margin</div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">Buy Price <em>ex GST</em></span>
                <input className="hn-pc-in hn-mono" value={f.buyEx} onChange={(e) => setBuyEx(e.target.value)} inputMode="decimal" />
              </div>

              <div className="hn-pc-line two">
                <span className="hn-pc-label">FC <em>(Product)</em></span>
                <div className="hn-pc-duo">
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">ex GST</span>
                    <input className="hn-pc-in hn-mono" value={f.fcEx} onChange={(e) => set('fcEx', e.target.value)} inputMode="decimal" />
                  </div>
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">incl GST</span>
                    <div className="hn-pc-out hn-mono">{fmt(fcIncl)}</div>
                  </div>
                </div>
              </div>

              <div className="hn-pc-line two">
                <span className="hn-pc-label">NP Available</span>
                <div className="hn-pc-duo">
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">$</span>
                    <input className="hn-pc-in hn-mono" value={f.npAvail} onChange={(e) => set('npAvail', e.target.value)} inputMode="decimal" />
                  </div>
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">%</span>
                    <div className="hn-pc-out hn-mono">{fmt(npPct, 3)}</div>
                  </div>
                </div>
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">Margin M$</span>
                <div className={`hn-pc-out hn-mono strong ${mDollars < 0 ? 'neg' : ''}`}>{fmt(mDollars)}</div>
              </div>

              <div className="hn-pc-line two">
                <span className="hn-pc-label">GP% / M%</span>
                <div className="hn-pc-duo">
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">GP %</span>
                    <div className={`hn-pc-out hn-mono ${gpPct < 0 ? 'neg' : ''}`}>{fmt(gpPct, 3)}</div>
                  </div>
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">M %</span>
                    <div className={`hn-pc-out hn-mono ${mPct < 0 ? 'neg' : ''}`}>{fmt(mPct, 3)}</div>
                  </div>
                </div>
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">Kept %</span>
                <input className="hn-pc-in hn-mono" value={f.keptPct} onChange={(e) => set('keptPct', e.target.value)} inputMode="decimal" />
              </div>
            </div>

            {/* Sell & Commission */}
            <div className="hn-pc-panel">
              <div className="hn-pc-panel-head">Sell &amp; Commission</div>

              <div className="hn-pc-line">
                <span className="hn-pc-label accent">Sell Price <em>incl GST</em></span>
                <input className="hn-pc-in hn-mono accent" value={f.sellIncl} onChange={(e) => setSell(e.target.value)} inputMode="decimal" />
              </div>

              <div className="hn-pc-line two">
                <span className="hn-pc-label">Discount</span>
                <div className="hn-pc-duo">
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">$</span>
                    <input className="hn-pc-in hn-mono" value={f.disc} onChange={(e) => setDiscDollars(e.target.value)} inputMode="decimal" />
                  </div>
                  <div className="hn-pc-sub">
                    <span className="hn-pc-subtag">%</span>
                    <input className="hn-pc-in hn-mono" value={f.discPct} onChange={(e) => setDiscPct(e.target.value)} inputMode="decimal" />
                  </div>
                </div>
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">Net Sell <em>incl GST</em></span>
                <div className="hn-pc-out hn-mono">{fmt(netSellIncl)}</div>
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">Comm %</span>
                <input className="hn-pc-in hn-mono" value={f.commPct} onChange={(e) => set('commPct', e.target.value)} inputMode="decimal" />
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">EST. C$</span>
                <div className="hn-pc-out hn-mono">{fmt(estC)}</div>
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">SP $</span>
                <input className="hn-pc-in hn-mono" value={f.sp} onChange={(e) => set('sp', e.target.value)} inputMode="decimal" />
              </div>

              <div className="hn-pc-line">
                <span className="hn-pc-label">TC $</span>
                <div className="hn-pc-out hn-mono strong">{fmt(tc)}</div>
              </div>
            </div>
          </div>

          {/* Result strip */}
          <div className="hn-pc-result">
            <div className={`hn-pc-result-cell ${marginHealthy ? 'good' : 'warn'}`}>
              <span className="hn-pc-result-label">Gross Profit</span>
              <span className="hn-pc-result-val hn-mono">{fmt(gpPct, 2)}%</span>
            </div>
            <div className="hn-pc-result-cell">
              <span className="hn-pc-result-label">Margin $</span>
              <span className="hn-pc-result-val hn-mono">${fmt(mDollars)}</span>
            </div>
            <div className="hn-pc-result-cell">
              <span className="hn-pc-result-label">Net Sell (ex GST)</span>
              <span className="hn-pc-result-val hn-mono">${fmt(sellEx)}</span>
            </div>
            <div className="hn-pc-result-cell accent">
              <span className="hn-pc-result-label">Total Comm.</span>
              <span className="hn-pc-result-val hn-mono">${fmt(tc)}</span>
            </div>
          </div>

          <div className="hn-browse-footer" style={{ marginTop: '4px' }}>
            <span>
              <button type="button" className="hn-pc-reset" onClick={() => setF(pricingSeed(product))}>Reset to catalogue</button>
            </span>
            <span><kbd className="hn-kbd-inline">Esc</kbd> Close · every field is editable</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Product Maintenance View (V from Browse) ───────────────────────────────
// Modern rebuild of the legacy "Product Maintenance View": eight read-only
// tabs of product master data. PageDown/PageUp move between tabs (as on the
// real terminal), Alt+1..8 jumps straight to a tab, F4 opens the Pricing
// Calculator for this product, Esc closes.
const PMV_TABS = [
  { id: 'main', label: 'Main Details', color: '#2563EB' },
  { id: 'pricing', label: 'Pricing', color: '#16A34A' },
  { id: 'suppliers', label: 'Suppliers', color: '#7C3AED' },
  { id: 'barcodes', label: 'Barcodes', color: '#0891B2' },
  { id: 'purchasing', label: 'Purchasing', color: '#D97706' },
  { id: 'special', label: 'Special Controls', color: '#DB2777' },
  { id: 'discounts', label: 'Discounts', color: '#DC2626' },
  { id: 'history', label: 'Sales History', color: '#0D9488' },
];

// Products without a transcribed detail block still open in the viewer with
// sensible defaults derived from their catalogue row.
function pmvDetailFor(p) {
  if (p.detail) return p.detail;
  return {
    main: {
      supMaintained: 'Y', availableToSell: 'Y', status: 'Active', availableOnline: 'Y',
      articleNo: '—', localNo: '', secondDesc: '',
      franchisee: '13660', franchiseeName: 'Harvey Norman AVIT',
      group: `${p.dept}—`, groupName: '', ranging: p.range || '—',
      origin: '—', originName: '', nonDiminishing: 'N', productType: '', style: '—',
      costing: 'B', extraDetail: '', stickerShowsPrice: 'Y',
      supplierCode: '—', supplierName: `${p.brand} (SUPPLIER NOT TRANSCRIBED)`,
      brand: p.brand, model: p.code, suppProduct: p.code,
      altSupplierCode: '', altSupplierName: '',
    },
    pricing: {
      invoiceCost: p.buyEx, applyGst: '', gstRate: 10, trade: 0,
      internalRebate: 0, internalRebatePct: 0, stFreight: 0, stFreightPct: 0,
      costEx: p.fcEx, costIncl: p.fcEx * 1.1,
      marginAmt: p.sellIncl / 1.1 - p.fcEx,
      gpPct: ((p.sellIncl / 1.1 - p.fcEx) / (p.sellIncl / 1.1)) * 100,
      marginPct: ((p.sellIncl / 1.1 - p.fcEx) / p.fcEx) * 100,
      salesRebates: 0, oaPurchaseRebates: 0, otherRebates: 0,
      netProfit: p.npAvail != null ? p.npAvail : p.sellIncl / 1.1 - p.buyEx,
      netProfitPct: 0,
      recMinSell: p.recMin || 0, recSell: p.sellIncl, onlinePrice: p.sellIncl, storeSell: p.sellIncl,
      exclusive: !!p.exclusive, onlineProduct: true, promo: 0, specialBuy: 0,
    },
    suppliers: [{ code: '—', name: `${p.brand} (mock)`, supProdCode: p.code, reordQty: 1, active: 'Y', primary: 'Y' }],
    barcodes: [],
    purchasing: {
      replenishment: 'Recommended',
      staticMin: 0, staticMax: 0, storeReorderQty: 0,
      minWeeksCover: 0, maxWeeksCover: 0, minShelfHolding: 0, dynStoreReorderQty: 0,
      uom: 'EA', suppReorderQty: 1, purchaseConv: 0,
      packQty: 'N/A', suppCost: 'N/A', storeCost: 'N/A',
      stockConstrained: 'Y', localPO: 'N',
      inventory: { soh: p.soh, onOrder: p.onOrder || 0, customerOrders: Math.max(0, p.soh - (p.avail != null ? p.avail : p.soh)), notAvailable: 0, totalAvailable: p.soh },
      salesRollup: [],
      avgWeeklyDemand: 0,
      leadTime: { m3: 0, m6: 0, m12: 0 },
    },
    specialControls: {
      location: '', noDiscounting: 'N', weightRequired: 'N', productWeight: 0,
      labelFormat: 0, hideSellPrice: 'N',
      length: 0, width: 0, height: 0, sizeUom: 'MMT',
      volume: 0, volumeUom: 'MTQ', grossWeight: 0, weightUom: 'KGM',
      warrantyMonths: 12, warrantyType: 'R1', productProtection: 'Y', qtyInBins: 1,
    },
    discounts: [],
    salesHistory: null,
  };
}

// Read-only labelled value cell used across all tabs.
function PmvSpec({ label, value, mono = true, span, color }) {
  return (
    <div className="hn-pmv-spec" style={span ? { gridColumn: `span ${span}` } : undefined}>
      <span className="hn-pmv-spec-label">{label}</span>
      <span className={`hn-pmv-spec-value ${mono ? 'hn-mono' : ''}`} style={color ? { color } : undefined}>
        {value === '' || value == null ? '—' : value}
      </span>
    </div>
  );
}

function PmvBox({ title, children }) {
  return (
    <div className="hn-pmv-box">
      <div className="hn-pmv-box-title">{title}</div>
      {children}
    </div>
  );
}

function ProductMaintenanceView({ product, tab, onTabChange, onClose, onOpenCalc, suspended }) {
  const d = pmvDetailFor(product);
  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(12, (window.innerWidth - 900) / 2),
    y: Math.max(12, (window.innerHeight - 640) / 6),
  }));

  // Keyboard: PageDown/PageUp cycle tabs, Alt+1..8 jumps, F4 opens the
  // Pricing Calculator, Esc handled by the parent (Browse). Suspended while
  // the calculator sits above this view.
  useEffect(() => {
    if (suspended) return;
    const handleKey = (e) => {
      const idx = PMV_TABS.findIndex((t) => t.id === tab);
      if (e.key === 'PageDown') { e.preventDefault(); onTabChange(PMV_TABS[(idx + 1) % PMV_TABS.length].id); return; }
      if (e.key === 'PageUp') { e.preventDefault(); onTabChange(PMV_TABS[(idx - 1 + PMV_TABS.length) % PMV_TABS.length].id); return; }
      // 1–8 (with or without Alt) jump straight to that tab. The view is
      // read-only with no text fields, so plain digits are safe to capture.
      if (/^[1-8]$/.test(e.key) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); onTabChange(PMV_TABS[Number(e.key) - 1].id); return; }
      if (e.key === 'F4') { e.preventDefault(); onOpenCalc(product); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [suspended, tab, onTabChange, onOpenCalc, product]);

  const fmt = (n, dp = 2) => (Number(n) || 0).toLocaleString('en-AU', { minimumFractionDigits: dp, maximumFractionDigits: dp });
  const yn = (v) => v || '—';

  // ---- Tab bodies ----
  const renderMain = () => (
    <>
      <PmvBox title="Product Data">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Sup Maintained" value={yn(d.main.supMaintained)} />
          <PmvSpec label="Available to Sell" value={yn(d.main.availableToSell)} />
          <PmvSpec label="Status" value={d.main.status} mono={false} />
          <PmvSpec label="Available Online" value={yn(d.main.availableOnline)} />
          <PmvSpec label="Product" value={product.code} />
          <PmvSpec label="Article No" value={d.main.articleNo} />
          <PmvSpec label="Local No" value={d.main.localNo} />
          <PmvSpec label="Sticker Shows Price" value={yn(d.main.stickerShowsPrice)} />
          <PmvSpec label="Description" value={product.description} mono={false} span={4} />
          <PmvSpec label="Franchisee" value={`${d.main.franchisee} · ${d.main.franchiseeName}`} mono={false} span={2} />
          <PmvSpec label="Group" value={`${d.main.group}${d.main.groupName ? ` · ${d.main.groupName}` : ''}`} span={2} />
          <PmvSpec label="Product Ranging" value={d.main.ranging} />
          <PmvSpec label="Country of Origin" value={`${d.main.origin}${d.main.originName ? ` · ${d.main.originName}` : ''}`} mono={false} />
          <PmvSpec label="Non-Diminishing" value={yn(d.main.nonDiminishing)} />
          <PmvSpec label="Style" value={d.main.style} />
          <PmvSpec label="Product Costing" value={d.main.costing} />
          <PmvSpec label="Extra Detail" value={d.main.extraDetail} />
          <PmvSpec label="Product Type" value={d.main.productType} />
        </div>
      </PmvBox>
      <PmvBox title="Supplier Details">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Supplier Code" value={d.main.supplierCode} />
          <PmvSpec label="Supplier" value={d.main.supplierName} mono={false} span={3} />
          <PmvSpec label="Brand" value={d.main.brand} mono={false} />
          <PmvSpec label="Model" value={d.main.model} />
          <PmvSpec label="Supp Product" value={d.main.suppProduct} span={2} />
        </div>
      </PmvBox>
      <PmvBox title="Alternate Supplier">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Code" value={d.main.altSupplierCode} />
          <PmvSpec label="Name" value={d.main.altSupplierName} mono={false} span={3} />
        </div>
      </PmvBox>
    </>
  );

  const renderPricing = () => (
    <>
      <PmvBox title="Product Purchase / Floor Cost">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Invoice Cost" value={fmt(d.pricing.invoiceCost)} />
          <PmvSpec label="Apply GST" value={d.pricing.applyGst || '—'} />
          <PmvSpec label="GST Rate %" value={fmt(d.pricing.gstRate)} />
          <PmvSpec label="Trade" value={fmt(d.pricing.trade)} />
          <PmvSpec label="Internal Rebate $ / %" value={`${fmt(d.pricing.internalRebate)} · ${fmt(d.pricing.internalRebatePct, 4)}%`} span={2} />
          <PmvSpec label="ST Freight $ / %" value={`${fmt(d.pricing.stFreight)} · ${fmt(d.pricing.stFreightPct, 3)}%`} span={2} />
          <PmvSpec label="Cost (GST Excl.)" value={fmt(d.pricing.costEx)} />
          <PmvSpec label="Cost (GST Incl.)" value={fmt(d.pricing.costIncl)} />
          <PmvSpec label="Margin Amount $" value={fmt(d.pricing.marginAmt)} />
          <PmvSpec label="GP % / Margin %" value={`${fmt(d.pricing.gpPct, 3)} · ${fmt(d.pricing.marginPct, 3)}`} />
        </div>
      </PmvBox>
      <div className="hn-pmv-cols2">
        <PmvBox title="Over and Aboves">
          <div className="hn-pmv-grid2">
            <PmvSpec label="Sales Rebates" value={fmt(d.pricing.salesRebates)} />
            <PmvSpec label="O&A Purchase Rebates" value={fmt(d.pricing.oaPurchaseRebates)} />
            <PmvSpec label="Other Rebates / Incentives" value={fmt(d.pricing.otherRebates)} />
            <PmvSpec label="NET Profit $ / %" value={`${fmt(d.pricing.netProfit)} · ${fmt(d.pricing.netProfitPct, 3)}%`} color="#16A34A" />
          </div>
        </PmvBox>
        <PmvBox title="Sell Price (GST Incl.)">
          <div className="hn-pmv-grid2">
            <PmvSpec label="Rec. Min. Sell Price" value={fmt(d.pricing.recMinSell)} />
            <PmvSpec label="Rec. Sell Price" value={fmt(d.pricing.recSell)} />
            <PmvSpec label="Online Price $" value={fmt(d.pricing.onlinePrice)} />
            <PmvSpec label="Store Sell Price" value={fmt(d.pricing.storeSell)} />
            <PmvSpec label="Exclusive Product" value={d.pricing.exclusive ? 'Y' : 'N'} />
            <PmvSpec label="Online Product" value={d.pricing.onlineProduct ? 'Y' : 'N'} />
          </div>
          <button type="button" className="hn-pmv-f4" onClick={() => onOpenCalc(product)}>
            <Calculator size={13} strokeWidth={1.75} /> Pricing Calculator <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.75 }}>F4</span>
          </button>
        </PmvBox>
      </div>
      <PmvBox title="Current Specials / Promotions">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Promo / Advertised $" value={fmt(d.pricing.promo)} />
          <PmvSpec label="Special Buy $" value={fmt(d.pricing.specialBuy)} />
          <PmvSpec label="Period" value="— / —" />
          <PmvSpec label="Description" value="" mono={false} />
        </div>
      </PmvBox>
    </>
  );

  const renderSuppliers = () => (
    <div className="hn-pmv-table">
      <div className="hn-pmv-tr hn-pmv-th" style={{ gridTemplateColumns: '90px 1fr 170px 90px 60px 66px' }}>
        <span>Supplier</span><span>Name</span><span>Sup. Prod. Code</span><span style={{ textAlign: 'right' }}>Reord Qty</span><span style={{ textAlign: 'center' }}>Active</span><span style={{ textAlign: 'center' }}>Primary</span>
      </div>
      {d.suppliers.map((s, i) => (
        <div key={i} className="hn-pmv-tr" style={{ gridTemplateColumns: '90px 1fr 170px 90px 60px 66px' }}>
          <span className="hn-mono">{s.code}</span>
          <span>{s.name}</span>
          <span className="hn-mono">{s.supProdCode}</span>
          <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(s.reordQty)}</span>
          <span className="hn-mono" style={{ textAlign: 'center' }}>{s.active}</span>
          <span className="hn-mono" style={{ textAlign: 'center' }}>{s.primary}</span>
        </div>
      ))}
    </div>
  );

  const renderBarcodes = () => (
    d.barcodes.length === 0 ? (
      <div className="hn-browse-empty"><div style={{ fontSize: '13px', fontWeight: 500 }}>No barcodes recorded for this product</div></div>
    ) : (
      <div className="hn-pmv-table">
        <div className="hn-pmv-tr hn-pmv-th" style={{ gridTemplateColumns: '150px 60px 1fr 70px 70px 170px' }}>
          <span>Barcode</span><span>UoM</span><span>Description</span><span style={{ textAlign: 'center' }}>Primary</span><span style={{ textAlign: 'right' }}>Qty</span><span>Created</span>
        </div>
        {d.barcodes.map((b, i) => (
          <div key={i} className="hn-pmv-tr" style={{ gridTemplateColumns: '150px 60px 1fr 70px 70px 170px' }}>
            <span className="hn-mono">{b.barcode}</span>
            <span className="hn-mono">{b.uom}</span>
            <span>{b.description}</span>
            <span className="hn-mono" style={{ textAlign: 'center' }}>{b.primary}</span>
            <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(b.qty)}</span>
            <span className="hn-mono">{b.created}</span>
          </div>
        ))}
      </div>
    )
  );

  const renderPurchasing = () => (
    <div className="hn-pmv-cols2">
      <div>
        <PmvBox title="Replenishment">
          <div className="hn-pmv-grid2">
            <PmvSpec label="Method" value={d.purchasing.replenishment} mono={false} />
            <PmvSpec label="Store Reorder Qty" value={fmt(d.purchasing.storeReorderQty)} />
            <PmvSpec label="Static Min / Max Holding" value={`${d.purchasing.staticMin} / ${d.purchasing.staticMax}`} />
            <PmvSpec label="Weeks Cover Min / Max" value={`${d.purchasing.minWeeksCover} / ${d.purchasing.maxWeeksCover}`} />
            <PmvSpec label="Min Shelf Holding" value={d.purchasing.minShelfHolding} />
            <PmvSpec label="Stock Constrained" value={yn(d.purchasing.stockConstrained)} />
          </div>
        </PmvBox>
        <PmvBox title="Quantity Modifiers">
          <div className="hn-pmv-grid2">
            <PmvSpec label="Unit of Measure" value={d.purchasing.uom} />
            <PmvSpec label="Supp Reorder Qty" value={fmt(d.purchasing.suppReorderQty)} />
            <PmvSpec label="Purchase Conv/x" value={fmt(d.purchasing.purchaseConv, 4)} />
            <PmvSpec label="Pack Quantity" value={d.purchasing.packQty} />
            <PmvSpec label="Supp. Cost $" value={d.purchasing.suppCost} />
            <PmvSpec label="Store Cost $" value={d.purchasing.storeCost} />
            <PmvSpec label="Local PO Available" value={yn(d.purchasing.localPO)} />
          </div>
        </PmvBox>
      </div>
      <div>
        <PmvBox title="Inventory Levels">
          <div className="hn-pmv-grid2">
            <PmvSpec label="Stock On Hand" value={fmt(d.purchasing.inventory.soh)} />
            <PmvSpec label="Stock On Order" value={fmt(d.purchasing.inventory.onOrder)} />
            <PmvSpec label="Customer Orders (HFM/SBO)" value={fmt(d.purchasing.inventory.customerOrders)} />
            <PmvSpec label="Not Available for Sale" value={fmt(d.purchasing.inventory.notAvailable)} />
            <PmvSpec label="Total Available for Sale" value={fmt(d.purchasing.inventory.totalAvailable)} color="#B45309" />
            <PmvSpec label="Avg Weekly Demand" value={fmt(d.purchasing.avgWeeklyDemand)} />
          </div>
        </PmvBox>
        {d.purchasing.salesRollup.length > 0 && (
          <PmvBox title="Sales History">
            <div className="hn-pmv-table">
              <div className="hn-pmv-tr hn-pmv-th" style={{ gridTemplateColumns: '1fr 62px 100px 74px' }}>
                <span>Period</span><span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>Avg Sell</span><span style={{ textAlign: 'right' }}>GP%</span>
              </div>
              {d.purchasing.salesRollup.map((r) => (
                <div key={r.label} className="hn-pmv-tr" style={{ gridTemplateColumns: '1fr 62px 100px 74px' }}>
                  <span>{r.label}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(r.qty)}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(r.avg)}</span>
                  <span className="hn-mono" style={{ textAlign: 'right', color: r.gp < 0 ? '#DC2626' : 'inherit' }}>{fmt(r.gp)}</span>
                </div>
              ))}
            </div>
          </PmvBox>
        )}
        <PmvBox title="Supplier Performance · Avg Lead Time (days)">
          <div className="hn-pmv-grid3">
            <PmvSpec label="3 Months" value={fmt(d.purchasing.leadTime.m3)} />
            <PmvSpec label="6 Months" value={fmt(d.purchasing.leadTime.m6)} />
            <PmvSpec label="12 Months" value={fmt(d.purchasing.leadTime.m12)} />
          </div>
        </PmvBox>
      </div>
    </div>
  );

  const renderSpecial = () => (
    <>
      <PmvBox title="Controls">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Location" value={d.specialControls.location} />
          <PmvSpec label="No Discounting" value={yn(d.specialControls.noDiscounting)} />
          <PmvSpec label="Hide Sell Price" value={yn(d.specialControls.hideSellPrice)} />
          <PmvSpec label="Label Format # (0/1)" value={d.specialControls.labelFormat} />
          <PmvSpec label="Weight Required" value={yn(d.specialControls.weightRequired)} />
          <PmvSpec label="Product Weight" value={`${fmt(d.specialControls.productWeight)} Kgs`} />
          <PmvSpec label="Qty in Bins" value={fmt(d.specialControls.qtyInBins)} />
        </div>
      </PmvBox>
      <PmvBox title="Shipping Dimensions and Details">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Product Length" value={fmt(d.specialControls.length, 3)} />
          <PmvSpec label="Product Width" value={fmt(d.specialControls.width, 3)} />
          <PmvSpec label="Product Height" value={fmt(d.specialControls.height, 3)} />
          <PmvSpec label="Product Size UoM" value={d.specialControls.sizeUom} />
          <PmvSpec label="Product Volume" value={fmt(d.specialControls.volume, 3)} />
          <PmvSpec label="Product Volume UoM" value={d.specialControls.volumeUom} />
          <PmvSpec label="Supplier Gross Weight" value={fmt(d.specialControls.grossWeight, 3)} />
          <PmvSpec label="Supplier Weight UoM" value={d.specialControls.weightUom} />
        </div>
      </PmvBox>
      <PmvBox title="Warranty & Protection">
        <div className="hn-pmv-grid4">
          <PmvSpec label="Mfg. Warranty (Months)" value={d.specialControls.warrantyMonths} />
          <PmvSpec label="Mfg. Warranty Type" value={d.specialControls.warrantyType} />
          <PmvSpec label="Product Protection Offer" value={yn(d.specialControls.productProtection)} />
        </div>
      </PmvBox>
    </>
  );

  const renderDiscounts = () => {
    if (d.discounts.length === 0) {
      return <div className="hn-browse-empty"><div style={{ fontSize: '13px', fontWeight: 500 }}>No discount records for this product</div></div>;
    }
    const vals = d.discounts.map((x) => x.value);
    const min = Math.min(...vals), max = Math.max(...vals), avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return (
      <>
        <div className="hn-pmv-disc-summary">
          <span>{d.discounts.length} records</span>
          <span>Lowest <b className="hn-mono">${fmt(min, 0)}</b></span>
          <span>Highest <b className="hn-mono">${fmt(max, 0)}</b></span>
          <span>Average <b className="hn-mono">${fmt(avg, 0)}</b></span>
        </div>
        <div className="hn-pmv-table" style={{ maxHeight: '340px', overflowY: 'auto' }}>
          <div className="hn-pmv-tr hn-pmv-th" style={{ gridTemplateColumns: '90px 1fr 120px' }}>
            <span>Type</span><span>Customer / Category</span><span style={{ textAlign: 'right' }}>Value 1</span>
          </div>
          {d.discounts.map((x, i) => (
            <div key={i} className="hn-pmv-tr" style={{ gridTemplateColumns: '90px 1fr 120px' }}>
              <span className="hn-mono">{x.type}</span>
              <span style={{ color: 'var(--text-faint)' }}>—</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(x.value, 4)}</span>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderHistory = () => {
    const h = d.salesHistory;
    if (!h) {
      return <div className="hn-browse-empty"><div style={{ fontSize: '13px', fontWeight: 500 }}>No sales history recorded for this product</div></div>;
    }
    const tot = h.months.reduce((a, m) => ({
      sales: a.sales + m.sales, gp: a.gp + m.gp, qty: a.qty + m.qty, purch: a.purch + m.purch, pQty: a.pQty + m.pQty,
    }), { sales: 0, gp: 0, qty: 0, purch: 0, pQty: 0 });
    return (
      <>
        <div className="hn-pmv-disc-summary">
          <span>Last Sale <b className="hn-mono">{h.lastSale}</b></span>
          <span>Last Purchase <b className="hn-mono">{h.lastPurchase}</b></span>
          <span>As at <b className="hn-mono">{h.asAt}</b></span>
          <span>WTD / MTD / YTD <b className="hn-mono">0.00</b></span>
        </div>
        <div className="hn-pmv-table">
          <div className="hn-pmv-tr hn-pmv-th" style={{ gridTemplateColumns: '110px 1fr 1fr 64px 1fr 64px' }}>
            <span>Month</span><span style={{ textAlign: 'right' }}>Sales</span><span style={{ textAlign: 'right' }}>G/P</span><span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>Purchases</span><span style={{ textAlign: 'right' }}>Qty</span>
          </div>
          {h.months.map((m) => (
            <div key={m.m} className="hn-pmv-tr" style={{ gridTemplateColumns: '110px 1fr 1fr 64px 1fr 64px' }}>
              <span>{m.m}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>{m.sales ? fmt(m.sales) : '—'}</span>
              <span className="hn-mono" style={{ textAlign: 'right', color: m.gp < 0 ? '#DC2626' : 'inherit' }}>{m.gp ? fmt(m.gp) : '—'}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>{m.qty || '—'}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>{m.purch ? fmt(m.purch) : '—'}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>{m.pQty || '—'}</span>
            </div>
          ))}
          <div className="hn-pmv-tr hn-pmv-total" style={{ gridTemplateColumns: '110px 1fr 1fr 64px 1fr 64px' }}>
            <span>Total (Year)</span>
            <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(tot.sales)}</span>
            <span className="hn-mono" style={{ textAlign: 'right', color: tot.gp < 0 ? '#DC2626' : 'inherit' }}>{fmt(tot.gp)}</span>
            <span className="hn-mono" style={{ textAlign: 'right' }}>{tot.qty}</span>
            <span className="hn-mono" style={{ textAlign: 'right' }}>{fmt(tot.purch)}</span>
            <span className="hn-mono" style={{ textAlign: 'right' }}>{tot.pQty}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="hn-browse-overlay" style={{ zIndex: 1150 }}>
      <div
        className="hn-browse-dialog hn-fade-in"
        style={{ left: position.x + 'px', top: position.y + 'px', width: '900px' }}
      >
        <div className="hn-browse-header" onMouseDown={handleDragStart} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span className="hn-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>
              Product Maintenance View
            </span>
            <span className="hn-pc-code hn-mono">{product.code}</span>
          </div>
          <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close">
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="hn-pmv-ident">
          <span className="hn-pmv-ident-name">{product.description}</span>
          <span className="hn-pmv-ident-meta hn-mono">Dept {product.dept} · SOH {product.soh} · ${(product.sellIncl).toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
        </div>

        {/* Tab bar */}
        <div className="hn-pmv-tabs">
          {PMV_TABS.map((t, i) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                className={`hn-pmv-tab ${isActive ? 'active' : ''}`}
                onClick={() => onTabChange(t.id)}
                style={isActive ? { color: t.color, borderBottomColor: t.color } : undefined}
              >
                <span
                  className="hn-mono hn-pmv-tab-num"
                  style={isActive
                    ? { background: t.color, borderColor: 'transparent', color: '#fff' }
                    : { color: t.color, borderColor: `color-mix(in srgb, ${t.color} 40%, var(--border))` }}
                >
                  {i + 1}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="hn-pmv-body" style={{ '--pmv-accent': (PMV_TABS.find((t) => t.id === tab) || {}).color }}>
          {tab === 'main' && renderMain()}
          {tab === 'pricing' && renderPricing()}
          {tab === 'suppliers' && renderSuppliers()}
          {tab === 'barcodes' && renderBarcodes()}
          {tab === 'purchasing' && renderPurchasing()}
          {tab === 'special' && renderSpecial()}
          {tab === 'discounts' && renderDiscounts()}
          {tab === 'history' && renderHistory()}
        </div>

        <div className="hn-browse-footer" style={{ padding: '10px 20px' }}>
          <span><kbd className="hn-kbd-inline">PgDn</kbd>/<kbd className="hn-kbd-inline">PgUp</kbd> Next / Prev tab</span>
          <span><kbd className="hn-kbd-inline">1</kbd>–<kbd className="hn-kbd-inline">8</kbd> Jump to tab</span>
          <span><kbd className="hn-kbd-inline">F4</kbd> Pricing Calc</span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}


function BrowseDialog({ isOpen, onClose }) {
  const [mode, setMode] = useState(SEARCH_MODES[0].id); // opens straight into Product Code
  const [query, setQuery] = useState('');
  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(20, (window.innerWidth - 1100) / 2),
    y: Math.max(20, (window.innerHeight - 460) / 3),
  }));
  const [searched, setSearched] = useState(false);

  // Highlighted catalogue row + the product whose Pricing Calculator (F4) is open
  const [selectedCode, setSelectedCode] = useState(MOCK_CATALOGUE[0]?.code || null);
  const [calcProduct, setCalcProduct] = useState(null);

  // Product Maintenance View (V on a highlighted row) + its active tab
  const [maintProduct, setMaintProduct] = useState(null);
  const [maintTab, setMaintTab] = useState('main');

  // Filters panel (Filter button / Alt+F) — mirrors the real terminal's
  // Key Words / Supplier / Brand / Range / Hierarchy / Min Sell / Max Sell / SOH panel.
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    keyWords: '', supplier: '', brand: '', range: '',
    hierarchy: '', minSell: '', maxSell: '', soh: '',
  });
  const updateFilter = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const clearFilters = () => setFilters({
    keyWords: '', supplier: '', brand: '', range: '',
    hierarchy: '', minSell: '', maxSell: '', soh: '',
  });
  const activeFilterCount = Object.values(filters).filter((v) => v.trim()).length;

  // Live-filtered catalogue results. Empty query shows the whole catalogue so
  // F4 works immediately; otherwise match on the active search mode.
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_CATALOGUE;
    return MOCK_CATALOGUE.filter((p) => {
      if (mode === 'productCode') return p.code.toLowerCase().includes(q);
      if (mode === 'barCode') return p.code.toLowerCase().includes(q);
      return p.description.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    });
  }, [query, mode]);

  // Keep the highlight on a row that still exists after filtering.
  useEffect(() => {
    if (!results.length) { setSelectedCode(null); return; }
    if (!results.some((p) => p.code === selectedCode)) setSelectedCode(results[0].code);
  }, [results, selectedCode]);

  const openCalcFor = (code) => {
    const p = MOCK_CATALOGUE.find((x) => x.code === code);
    if (p) setCalcProduct(p);
  };

  const inputRef = useRef(null);

  // Reset transient state when the dialog closes, and re-open straight into
  // Product Code search next time (no more idle "press S" step).
  useEffect(() => {
    if (!isOpen) {
      setMode(SEARCH_MODES[0].id);
      setQuery('');
      setSearched(false);
      setFiltersOpen(false);
      clearFilters();
      setCalcProduct(null);
      setMaintProduct(null);
      setMaintTab('main');
      setSelectedCode(MOCK_CATALOGUE[0]?.code || null);
    }
  }, [isOpen]);

  // The search field is deliberately NOT focused on open — the operator
  // presses S (or clicks Search on the toolbar / the field itself) to start
  // typing a query. This keeps single-key actions (V, arrows) live on open.
  const focusSearch = () => {
    if (inputRef.current) { inputRef.current.focus(); inputRef.current.select(); }
  };

  const openMaintFor = (code) => {
    const p = MOCK_CATALOGUE.find((x) => x.code === code);
    if (p) { setMaintTab('main'); setMaintProduct(p); }
  };

  // Global keys while open. Esc peels layers: calculator -> maintenance view ->
  // browse itself. F4 opens the calculator (for the maintenance product when
  // that view is on top, otherwise the highlighted row). V opens the
  // maintenance view. Arrow keys move the highlight -- they also work while
  // the search input is focused, since up/down does nothing useful in a
  // one-line input and it saves a click.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (calcProduct) { setCalcProduct(null); return; }
        if (maintProduct) { setMaintProduct(null); return; }
        onClose();
        return;
      }
      if (calcProduct) return; // calculator owns the keyboard while it's open
      if (e.key === 'F4') {
        e.preventDefault();
        openCalcFor(maintProduct ? maintProduct.code : selectedCode);
        return;
      }
      if (maintProduct) return; // maintenance view handles PgUp/PgDn/Alt+1..8 itself
      if (e.altKey && e.code === 'KeyF') {
        e.preventDefault();
        setFiltersOpen((f) => !f);
        return;
      }
      const tag = e.target && e.target.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA';
      if (!typing && e.code === 'KeyS' && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        focusSearch();
        return;
      }
      if (!typing && e.code === 'KeyV' && !e.altKey && !e.ctrlKey && !e.metaKey && selectedCode) {
        e.preventDefault();
        openMaintFor(selectedCode);
        return;
      }
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && results.length) {
        e.preventDefault();
        const i = Math.max(0, results.findIndex((p) => p.code === selectedCode));
        const next = e.key === 'ArrowDown' ? Math.min(results.length - 1, i + 1) : Math.max(0, i - 1);
        setSelectedCode(results[next].code);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, calcProduct, maintProduct, selectedCode, results]);

  // Toolbar actions are placeholders pending SAP integration — Filter is the
  // one wired up today since it has a real panel to show.
  const handleToolbarAction = (id) => {
    if (id === 'search') {
      focusSearch();
      return;
    }
    if (id === 'filter') {
      setFiltersOpen((f) => !f);
      return;
    }
    if (id === 'view') {
      if (selectedCode) openMaintFor(selectedCode);
      return;
    }
    if (id === 'pricingCalc') {
      if (selectedCode) openCalcFor(selectedCode);
      return;
    }
    // Other actions (Search, Change, Add, Copy, Delete, etc.) are
    // intentionally no-ops until the product catalogue is connected.
  };

  // Enter inside the input: cycle modes if empty (wraps around), execute search if not
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim() === '') {
        const idx = SEARCH_MODES.findIndex((m) => m.id === mode);
        const nextIdx = (idx + 1) % SEARCH_MODES.length; // wraps Bar Code -> Description
        setMode(SEARCH_MODES[nextIdx].id);
        setSearched(false);
      } else {
        setSearched(true);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="hn-browse-overlay">
      <div
        className="hn-browse-dialog hn-browse-dialog-wide hn-fade-in"
        style={{
          left: position.x + 'px',
          top: position.y + 'px',
        }}
      >
        {/* Draggable header */}
        <div
          className="hn-browse-header"
          onMouseDown={handleDragStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span
              className="hn-mono"
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.7,
              }}
            >
              Browse · Alt + B
            </span>
          </div>
          <button
            type="button"
            className="hn-browse-close"
            onClick={onClose}
            aria-label="Close browse"
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Action toolbar — mirrors the real terminal's function-key bar */}
        <div className="hn-browse-toolbar">
          {BROWSE_ACTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`hn-toolbar-btn ${a.primary ? 'primary' : ''} ${a.live ? 'live' : ''} ${a.id === 'filter' && filtersOpen ? 'active' : ''}`}
              onClick={() => handleToolbarAction(a.id)}
            >
              {a.key && <span className="hn-mono hn-toolbar-key">{a.key}</span>}
              {renderAccessLabel(a.label, a.accessKey, a.accessIndex)}
              {a.id === 'filter' && activeFilterCount > 0 && (
                <span className="hn-toolbar-badge">{activeFilterCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="hn-browse-body">
          <div style={{ marginBottom: '18px' }}>
            <h3
              className="hn-serif"
              style={{
                margin: 0,
                fontSize: '22px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              Product Browse
            </h3>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: '12.5px',
                color: 'var(--text-muted)',
              }}
            >
              Search the catalogue by description, key words, product code or bar code.
            </p>
          </div>

          {/* Search modes list */}
          <div className="hn-browse-modes">
            {SEARCH_MODES.map((m) => {
              const active = mode === m.id;
              return (
                <div key={m.id} className={`hn-mode-row ${active ? 'active' : ''}`}>
                  <span className="hn-mode-indicator">{active ? '▸' : ''}</span>
                  <span className="hn-mode-label">{m.label}</span>
                  {m.popular && <span className="hn-mode-popular">most used</span>}
                </div>
              );
            })}
          </div>

          {/* Search input — opens straight into Product Code, no extra step */}
          <div style={{ marginTop: '18px' }}>
            <div className="hn-browse-search-row">
              <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)' }} />
              <input
                ref={inputRef}
                type="text"
                className="hn-browse-input hn-mono"
                placeholder={
                  mode === 'description'
                    ? 'Type a description…'
                    : mode === 'keywords'
                    ? 'Type key words…'
                    : mode === 'productCode'
                    ? 'e.g. QA77S90F'
                    : 'Scan or type a bar code…'
                }
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearched(false);
                }}
                onKeyDown={handleInputKeyDown}
              />
              <span className="hn-mode-tag">
                {SEARCH_MODES.find((m) => m.id === mode)?.tag}
              </span>
            </div>
          </div>

          {/* Results — highlight a row, then F4 opens its Pricing Calculator */}
          <div className="hn-browse-results">
            <div className="hn-browse-results-head">
              <span>
                {results.length} {results.length === 1 ? 'product' : 'products'}
                {query.trim() ? <> · matching "<span style={{ color: 'var(--text)' }}>{query}</span>"</> : ' · full catalogue'}
              </span>
              <span className="hn-browse-results-hint"><kbd className="hn-kbd-inline">S</kbd> Search · <kbd className="hn-kbd-inline">↑↓</kbd> Select · <kbd className="hn-kbd-inline">V</kbd> View · <kbd className="hn-kbd-inline">F4</kbd> Pricing Calc</span>
            </div>

            {results.length === 0 ? (
              <div className="hn-browse-empty">
                <div style={{ fontSize: '13.5px', fontWeight: 500 }}>No products match that search</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                  Try a different code or description.
                </div>
              </div>
            ) : (
              <div className="hn-prod-list">
                <div className="hn-prod-row hn-prod-head">
                  <span>Product Name</span>
                  <span>Product Code</span>
                  <span style={{ textAlign: 'right' }}>SOH</span>
                  <span style={{ textAlign: 'right' }}>Avail</span>
                  <span style={{ textAlign: 'right' }}>On Ord</span>
                  <span style={{ textAlign: 'right' }}>Retail $</span>
                  <span style={{ textAlign: 'center' }}>Rng</span>
                </div>
                {results.map((p) => {
                  const active = p.code === selectedCode;
                  const avail = p.avail != null ? p.avail : p.soh;
                  return (
                    <div
                      key={p.code}
                      className={`hn-prod-row ${active ? 'active' : ''}`}
                      onClick={() => setSelectedCode(p.code)}
                      onDoubleClick={() => openMaintFor(p.code)}
                    >
                      <span className="hn-prod-name">{p.description}</span>
                      <span className="hn-mono hn-prod-code">{p.code}</span>
                      <span className="hn-mono" style={{ textAlign: 'right', color: p.soh > 0 ? 'inherit' : '#DC2626' }}>{p.soh}</span>
                      <span className="hn-mono" style={{ textAlign: 'right', fontWeight: 600, color: avail > 0 ? '#16A34A' : '#DC2626' }}>{avail}</span>
                      <span className="hn-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>{p.onOrder || 0}</span>
                      <span className="hn-mono" style={{ textAlign: 'right' }}>{p.sellIncl.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      <span className="hn-mono" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{p.range || '—'}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filters panel — toggled via the Filter button or Alt+F, pinned to
              the bottom of the dialog so it reads as a refinement step that
              comes after search, not before it. */}
          {filtersOpen && (
            <div className="hn-filters-panel hn-fade-in">
              <div className="hn-filters-title">
                <span className="hn-filters-title-text">
                  <span className="hn-access-key">F</span>ilters
                  {activeFilterCount > 0 && (
                    <span className="hn-toolbar-badge" style={{ marginLeft: '8px' }}>{activeFilterCount}</span>
                  )}
                </span>
                {activeFilterCount > 0 && (
                  <button type="button" className="hn-filters-clear" onClick={clearFilters}>
                    Clear all
                  </button>
                )}
              </div>
              <div className="hn-filters-grid">
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Key Words</span>
                  <input
                    className="hn-filter-input hn-mono"
                    value={filters.keyWords}
                    onChange={(e) => updateFilter('keyWords', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Hierarchy</span>
                  <input
                    className="hn-filter-input hn-mono"
                    value={filters.hierarchy}
                    onChange={(e) => updateFilter('hierarchy', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Supplier</span>
                  <input
                    className="hn-filter-input hn-mono"
                    value={filters.supplier}
                    onChange={(e) => updateFilter('supplier', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Min Sell</span>
                  <input
                    className="hn-filter-input hn-mono"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={filters.minSell}
                    onChange={(e) => updateFilter('minSell', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Brand</span>
                  <input
                    className="hn-filter-input hn-mono"
                    value={filters.brand}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Max Sell</span>
                  <input
                    className="hn-filter-input hn-mono"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={filters.maxSell}
                    onChange={(e) => updateFilter('maxSell', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">Range</span>
                  <input
                    className="hn-filter-input hn-mono"
                    value={filters.range}
                    onChange={(e) => updateFilter('range', e.target.value)}
                  />
                </label>
                <label className="hn-filter-field">
                  <span className="hn-filter-label">SOH</span>
                  <input
                    className="hn-filter-input hn-mono"
                    inputMode="numeric"
                    value={filters.soh}
                    onChange={(e) => updateFilter('soh', e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="hn-browse-footer">
          <span>
            <kbd className="hn-kbd-inline">↵</kbd>{' '}
            {query.trim() ? 'Search' : 'Next mode'}
          </span>
          <span>
            <kbd className="hn-kbd-inline">V</kbd> View product
          </span>
          <span>
            <kbd className="hn-kbd-inline">F4</kbd> Pricing Calc
          </span>
          <span>
            <kbd className="hn-kbd-inline">⌥F</kbd> {filtersOpen ? 'Hide filters' : 'Filters'}
          </span>
          <span>
            <kbd className="hn-kbd-inline">Esc</kbd> Close
          </span>
        </div>
      </div>

      {/* Product Maintenance View (V) — layered above the browse dialog */}
      {maintProduct && (
        <ProductMaintenanceView
          product={maintProduct}
          tab={maintTab}
          onTabChange={setMaintTab}
          onClose={() => setMaintProduct(null)}
          onOpenCalc={(p) => setCalcProduct(p)}
          suspended={!!calcProduct}
        />
      )}

      {/* Pricing Calculator (F4) — layered above the browse dialog */}
      {calcProduct && (
        <PricingCalculatorPanel product={calcProduct} onClose={() => setCalcProduct(null)} />
      )}
    </div>
  );
}

// ─── Customer Search dialog (Alt + C / Option + C) ──────────────────────────
const CUSTOMER_SEARCH_MODES = [
  { id: 'phone',   label: 'Phone Number',    tag: 'Phone',     hint: 'e.g. 0412 884 219' },
  { id: 'invoice', label: 'Invoice Number',  tag: 'Invoice',   hint: 'e.g. INV-004821' },
  { id: 'address', label: 'House Address',   tag: 'Address',   hint: 'e.g. 15 Tarneit Rd' },
];

function CustomerSearchDialog({ isOpen, onClose }) {
  const [mode, setMode] = useState(CUSTOMER_SEARCH_MODES[0].id);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null); // null = not yet searched
  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(20, (window.innerWidth - 750) / 2),
    y: Math.max(20, (window.innerHeight - 520) / 3),
  }));
  const inputRef = useRef(null);

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setMode(CUSTOMER_SEARCH_MODES[0].id);
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  // Focus input whenever mode changes or dialog opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay so the DOM is ready after a mode switch
      const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [isOpen, mode]);

  // Esc closes, Tab cycles modes
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  const runSearch = () => {
    const q = query.trim();
    if (!q) return;
    if (mode === 'phone') {
      const customers = searchCustomersByPhone(q);
      setResults({ type: 'customers', rows: customers });
    } else if (mode === 'invoice') {
      const invoices = searchInvoiceById(q);
      setResults({ type: 'invoices', rows: invoices });
    } else {
      const customers = searchCustomersByAddress(q);
      setResults({ type: 'customers', rows: customers });
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim() === '') {
        // Empty box: cycle to the next search mode, wrapping back to Phone
        // after House Address — mirrors the Browse dialog's S → Enter cycling.
        const idx = CUSTOMER_SEARCH_MODES.findIndex((m) => m.id === mode);
        const nextIdx = (idx + 1) % CUSTOMER_SEARCH_MODES.length;
        setMode(CUSTOMER_SEARCH_MODES[nextIdx].id);
        setResults(null);
      } else {
        runSearch();
      }
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setQuery('');
    setResults(null);
  };

  const currentMode = CUSTOMER_SEARCH_MODES.find((m) => m.id === mode);

  if (!isOpen) return null;

  return (
    <div className="hn-browse-overlay">
      <div
        className="hn-browse-dialog hn-fade-in"
        style={{ left: position.x + 'px', top: position.y + 'px', width: '750px' }}
      >
        {/* Draggable header */}
        <div
          className="hn-browse-header"
          onMouseDown={handleDragStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span className="hn-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>
              Customer Search · Alt + C
            </span>
          </div>
          <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close customer search">
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="hn-browse-body">
          <div style={{ marginBottom: '16px' }}>
            <h3 className="hn-serif" style={{ margin: 0, fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
              Customer Search
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-muted)' }}>
              Look up a customer by phone number, invoice number, or address.
            </p>
          </div>

          {/* Mode tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
            {CUSTOMER_SEARCH_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => switchMode(m.id)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '8px',
                  border: mode === m.id ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: mode === m.id ? 'var(--accent-soft)' : 'var(--surface)',
                  color: mode === m.id ? 'var(--accent)' : 'var(--text-muted)',
                  fontSize: '12px',
                  fontWeight: mode === m.id ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="hn-browse-search-row">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              ref={inputRef}
              type={mode === 'phone' ? 'tel' : 'text'}
              inputMode={mode === 'phone' ? 'tel' : 'text'}
              className="hn-browse-input hn-mono"
              placeholder={currentMode.hint}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setResults(null); }}
              onKeyDown={handleInputKeyDown}
            />
            <span className="hn-mode-tag">{currentMode.tag}</span>
          </div>

          {/* Results */}
          <div style={{ marginTop: '14px', minHeight: '120px' }}>
            {results === null && (
              <div className="hn-browse-idle" style={{ marginTop: '8px' }}>
                <span className="hn-kbd-large" style={{ fontSize: '14px', width: 'auto', height: 'auto', padding: '8px 12px', borderRadius: '8px' }}>↵</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>Press <kbd className="hn-kbd-inline">↵</kbd> to search</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>Switch modes with the tabs above.</div>
                </div>
              </div>
            )}

            {results !== null && results.rows.length === 0 && (
              <div className="hn-browse-empty">
                <div style={{ fontSize: '13.5px', fontWeight: 500 }}>No results found</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                  Try a different search term or mode.
                </div>
              </div>
            )}

            {results !== null && results.rows.length > 0 && results.type === 'customers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Consolas,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {results.rows.length} customer{results.rows.length !== 1 ? 's' : ''} found
                </div>
                {results.rows.map((c) => (
                  <div key={c.id} className="hn-cust-search-row">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{c.firstName} {c.lastName}</span>
                      <span className="hn-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.id} · {c.mobile || c.phone || '—'}</span>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-faint)' }}>{c.address}</span>
                    </div>
                    <span className="hn-mono" style={{ fontSize: '11px', color: 'var(--text-faint)', flexShrink: 0, alignSelf: 'flex-start' }}>{c.email}</span>
                  </div>
                ))}
              </div>
            )}

            {results !== null && results.rows.length > 0 && results.type === 'invoices' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Consolas,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {results.rows.length} invoice{results.rows.length !== 1 ? 's' : ''} found
                </div>
                {results.rows.map((inv) => {
                  const cust = customerForInvoice(inv);
                  return (
                    <div key={inv.id} className="hn-cust-search-row">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="hn-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{inv.id}</span>
                          <span style={{
                            fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '999px',
                            background: inv.status === 'Delivered' ? 'rgba(21,128,61,0.1)' : 'rgba(217,119,6,0.1)',
                            color:      inv.status === 'Delivered' ? 'var(--success)'       : '#B45309',
                          }}>
                            {inv.status}
                          </span>
                        </div>
                        {cust && <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{cust.firstName} {cust.lastName} · {cust.mobile || cust.phone}</span>}
                        <span className="hn-mono" style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{inv.date} · {inv.total}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="hn-browse-footer">
          <span><kbd className="hn-kbd-inline">↵</kbd> Search</span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

// Rolling capacity for the Alt+I "Saved" tab — the spec calls for the last
// 5–7 invoices; 6 splits the difference.
const SAVED_INVOICES_MAX = 6;

// ─── Invoice Lookup dialog (Alt + I / Option + I) ───────────────────────────
// The single doorway to existing invoices. Two tabs:
//   1 · Search — press S, type an invoice number, Enter opens it.
//   2 · Saved  — a rolling list of starred invoices (max SAVED_INVOICES_MAX).
// Press M anywhere in the popup to arm Modify mode (clearly badged): while ON,
// opening an invoice — from either tab — loads it in Invoice Modification
// instead of just viewing it. Invoice Modification has no menu entry any more;
// this popup is the only way in.
function InvoiceLookupDialog({ isOpen, onClose, onReopen, onModify, savedInvoices, onToggleSave }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null); // null = not yet searched
  const [tab, setTab] = useState('search');     // 'search' | 'saved'
  const [modifyOn, setModifyOn] = useState(false);
  const [notice, setNotice] = useState('');     // star/unstar feedback
  const noticeTimer = useRef(null);
  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(20, (window.innerWidth - 720) / 2),
    y: Math.max(20, (window.innerHeight - 460) / 3),
  }));
  const inputRef = useRef(null);

  // Fresh state each time the popup opens. Modify mode deliberately resets to
  // OFF so nobody lands in modification by accident from a previous use.
  useEffect(() => {
    if (!isOpen) {
      setQuery(''); setResults(null); setTab('search'); setModifyOn(false); setNotice('');
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    }
  }, [isOpen]);

  const showNotice = (msg) => {
    if (!msg) return;
    setNotice(msg);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 4500);
  };

  // Popup-level keys. The search box is NOT auto-focused — the operator
  // presses S for it — so single-letter shortcuts work the moment the popup
  // opens: M (modify), S (search), 1/2 (tabs). While typing in the input,
  // letters pass through untouched.
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'm' || e.key === 'M') { e.preventDefault(); setModifyOn((v) => !v); return; }
      if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setTab('search');
        setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
        return;
      }
      if (e.key === '1') { e.preventDefault(); setTab('search'); return; }
      if (e.key === '2') { e.preventDefault(); setTab('saved'); return; }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  const runSearch = () => {
    const q = query.trim();
    if (!q) return;
    setResults(searchInvoiceById(q));
  };

  // One opener for both tabs: Modify mode decides where the invoice lands.
  const openInvoice = (inv) => {
    if (modifyOn) onModify(inv);
    else onReopen(inv);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Exactly one result already showing → Enter opens it directly, keeping
      // Alt+I the fast, near-zero-click path it's meant to be.
      if (results && results.length === 1) {
        openInvoice(results[0]);
        return;
      }
      if (query.trim()) runSearch();
    }
  };

  if (!isOpen) return null;

  const isSaved = (inv) => savedInvoices.some((s) => s.id === inv.id);

  // A single result/saved row. Rendered as a div (not a button) so the star
  // can be its own button without invalid button-in-button nesting.
  const renderInvoiceRow = (inv, savedIndex) => {
    const cust = customerForInvoice(inv);
    const saved = isSaved(inv);
    return (
      <div
        key={inv.id + (savedIndex != null ? '-saved' : '')}
        className="hn-cust-search-row"
        role="button"
        tabIndex={0}
        style={{ width: '100%', textAlign: 'left', border: modifyOn ? '1px solid rgba(217,119,6,0.45)' : '1px solid var(--border)', cursor: 'pointer' }}
        onClick={() => openInvoice(inv)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); openInvoice(inv); } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {savedIndex != null && (
              <span className="hn-mono" style={{ fontSize: '10px', color: 'var(--text-faint)' }}>#{savedIndex + 1}</span>
            )}
            <span className="hn-mono" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{inv.id}</span>
            <span style={{
              fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '999px',
              background: inv.status === 'Delivered' ? 'rgba(21,128,61,0.1)' : 'rgba(217,119,6,0.1)',
              color:      inv.status === 'Delivered' ? 'var(--success)'       : '#B45309',
            }}>
              {inv.status}
            </span>
          </div>
          {cust && <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{cust.firstName} {cust.lastName} · {cust.mobile || cust.phone}</span>}
          <span className="hn-mono" style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{inv.date} · {inv.total}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, alignSelf: 'center' }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); showNotice(onToggleSave(inv)); }}
            title={saved ? 'Remove from saved' : 'Save to the Saved tab'}
            aria-label={saved ? `Unsave ${inv.id}` : `Save ${inv.id}`}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '28px', height: '28px', borderRadius: '7px',
              border: '1px solid var(--border)', cursor: 'pointer',
              background: saved ? 'rgba(217,119,6,0.12)' : 'transparent',
              color: saved ? '#B45309' : 'var(--text-faint)',
            }}
          >
            <Star size={14} strokeWidth={1.75} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
            color: modifyOn ? '#B45309' : 'var(--text-faint)',
          }}>
            {modifyOn ? 'Modify' : 'Open'} <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </div>
      </div>
    );
  };

  const tabBtnStyle = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: '7px',
    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
    fontSize: '12px', fontWeight: 600,
    border: active ? '1px solid var(--text)' : '1px solid var(--border)',
    background: active ? 'var(--text)' : 'transparent',
    color: active ? 'var(--bg)' : 'var(--text-muted)',
  });

  return (
    <div className="hn-browse-overlay">
      <div
        className="hn-browse-dialog hn-fade-in"
        style={{ left: position.x + 'px', top: position.y + 'px', width: '690px' }}
      >
        <div
          className="hn-browse-header"
          onMouseDown={handleDragStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span className="hn-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>
              Invoice Lookup · Alt + I
            </span>
          </div>
          <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close invoice lookup">
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="hn-browse-body">
          <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
            <div>
              <h3 className="hn-serif" style={{ margin: 0, fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                Invoice Lookup
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Press <kbd className="hn-kbd-inline">S</kbd> to search, or <kbd className="hn-kbd-inline">2</kbd> for your saved invoices.
              </p>
            </div>
            {/* Modify-mode badge: always visible, unmistakable when armed. */}
            <button
              type="button"
              onClick={() => setModifyOn((v) => !v)}
              title="Press M to toggle Modify mode"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px', flexShrink: 0,
                padding: '7px 12px', borderRadius: '999px', cursor: 'pointer',
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                border: modifyOn ? '1px solid #B45309' : '1px solid var(--border)',
                background: modifyOn ? 'rgba(217,119,6,0.14)' : 'transparent',
                color: modifyOn ? '#B45309' : 'var(--text-muted)',
              }}
            >
              <SquarePen size={13} strokeWidth={2} />
              Modify {modifyOn ? 'ON' : 'OFF'}
              <kbd className="hn-kbd-inline">M</kbd>
            </button>
          </div>

          {/* Tabs — 1 · Search, 2 · Saved */}
          <div style={{ display: 'flex', gap: '7px', marginBottom: '12px' }}>
            <button type="button" style={tabBtnStyle(tab === 'search')} onClick={() => setTab('search')}>
              <kbd className="hn-kbd-inline" style={{ opacity: 0.75 }}>1</kbd> Search
            </button>
            <button type="button" style={tabBtnStyle(tab === 'saved')} onClick={() => setTab('saved')}>
              <kbd className="hn-kbd-inline" style={{ opacity: 0.75 }}>2</kbd> Saved
              <span className="hn-mono" style={{ fontSize: '10.5px', opacity: 0.8 }}>{savedInvoices.length}/{SAVED_INVOICES_MAX}</span>
            </button>
          </div>

          {/* Armed-mode strip so there's zero ambiguity about what Enter does. */}
          {modifyOn && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px',
              padding: '8px 12px', borderRadius: '8px',
              background: 'rgba(217,119,6,0.1)', border: '1px solid rgba(217,119,6,0.35)',
              fontSize: '12px', color: '#B45309', fontWeight: 500,
            }}>
              <SquarePen size={13} strokeWidth={2} style={{ flexShrink: 0 }} />
              Modify mode is ON — opening an invoice loads it in Invoice Modification. Press <kbd className="hn-kbd-inline">M</kbd> to turn it off.
            </div>
          )}

          {tab === 'search' && (
            <>
              <div className="hn-browse-search-row">
                <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <input
                  ref={inputRef}
                  type="text"
                  className="hn-browse-input hn-mono"
                  placeholder="e.g. INV-004821"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setResults(null); }}
                  onKeyDown={handleInputKeyDown}
                />
                <span className="hn-mode-tag" style={modifyOn ? { background: 'rgba(217,119,6,0.14)', color: '#B45309' } : undefined}>
                  {modifyOn ? 'Modify' : 'Invoice'}
                </span>
              </div>

              <div style={{ marginTop: '14px', minHeight: '100px' }}>
                {results === null && (
                  <div className="hn-browse-idle" style={{ marginTop: '8px' }}>
                    <span className="hn-kbd-large" style={{ fontSize: '14px', width: 'auto', height: 'auto', padding: '8px 12px', borderRadius: '8px' }}>S</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
                        Press <kbd className="hn-kbd-inline">S</kbd>, type the invoice number, then <kbd className="hn-kbd-inline">↵</kbd>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        A single match opens immediately on Enter{modifyOn ? ' — in Invoice Modification' : ''}. Star a result to keep it in the Saved tab.
                      </div>
                    </div>
                  </div>
                )}

                {results !== null && results.length === 0 && (
                  <div className="hn-browse-empty">
                    <div style={{ fontSize: '13.5px', fontWeight: 500 }}>No invoice found</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                      Check the invoice number and try again.
                    </div>
                  </div>
                )}

                {results !== null && results.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Consolas,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {results.length} invoice{results.length !== 1 ? 's' : ''} found
                    </div>
                    {results.map((inv) => renderInvoiceRow(inv))}
                  </div>
                )}
              </div>
            </>
          )}

          {tab === 'saved' && (
            <div style={{ minHeight: '100px' }}>
              {savedInvoices.length === 0 ? (
                <div className="hn-browse-empty">
                  <div style={{ fontSize: '13.5px', fontWeight: 500 }}>No saved invoices yet</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                    Star an invoice from the Search tab to pin it here. Keeps your last {SAVED_INVOICES_MAX} — saving another replaces the oldest.
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Consolas,monospace', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {savedInvoices.length} saved · oldest is replaced first once full ({SAVED_INVOICES_MAX} max)
                  </div>
                  {savedInvoices.map((inv, idx) => renderInvoiceRow(inv, idx))}
                </div>
              )}
            </div>
          )}

          {notice && (
            <div style={{
              marginTop: '12px', padding: '8px 12px', borderRadius: '8px',
              background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.28)',
              fontSize: '12px', color: 'var(--text)', fontWeight: 500,
            }}>
              {notice}
            </div>
          )}
        </div>

        <div className="hn-browse-footer">
          <span>
            <kbd className="hn-kbd-inline">M</kbd> Modify · <kbd className="hn-kbd-inline">S</kbd> Search · <kbd className="hn-kbd-inline">1</kbd>/<kbd className="hn-kbd-inline">2</kbd> Tabs
          </span>
          <span><kbd className="hn-kbd-inline">↵</kbd> {modifyOn ? 'Modify invoice' : 'Open invoice'} · <kbd className="hn-kbd-inline">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

// Shared drag behaviour for floating, movable popups (Browse-style panels).
function useDraggable(getInitial) {
  const [position, setPosition] = useState(getInitial);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.preventDefault();
  };

  useEffect(() => {
    if (!isDragging) return;
    let animationFrame = 0;
    const move = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 60;
        setPosition({
          x: Math.max(-300, Math.min(maxX, clientX - dragOffset.current.x)),
          y: Math.max(0, Math.min(maxY, clientY - dragOffset.current.y)),
        });
      });
    };
    const up = () => setIsDragging(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [isDragging]);

  return { position, isDragging, handleDragStart };
}

// Generic movable popup shell (draggable header + close), matching the Browse look.
function MovablePanel({ title, onClose, width = 460, children }) {
  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(20, (window.innerWidth - width) / 2),
    y: Math.max(20, (window.innerHeight - 460) / 3),
  }));

  // Close on Escape — captured at the window level *before* it bubbles, and
  // halted with stopImmediatePropagation so the app's master key router never
  // sees it. Without this, Esc would close the panel AND (on the home screen)
  // pop the logout prompt, since the router's early-out on "a popup is open"
  // races the panel's own close. Capturing here wins that race every time.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [onClose]);

  return (
    <div className="hn-browse-overlay">
      <div
        className="hn-browse-dialog hn-fade-in"
        style={{ left: position.x + 'px', top: position.y + 'px', width: width + 'px' }}
      >
        <div
          className="hn-browse-header"
          onMouseDown={handleDragStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span
              className="hn-mono"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}
            >
              {title}
            </span>
          </div>
          <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close">
            <X size={14} strokeWidth={2} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Calculator ─────────────────────────────────────────────────────────────
// Safe BODMAS evaluator — recursive descent parser, no eval(). Supports
// + − × ÷, parentheses, decimals, unary minus, postfix % (50% → 0.5), and
// implicit multiplication: 5(5) → 25, (2+3)5 → 25, 5(2+3) → 25, (2)(3) → 6.
// Throws on malformed input; caller shows "Error".
function calcEvaluate(raw) {
  const s = raw.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/\s+/g, '');
  if (!s) return null;
  let i = 0;
  const peek = () => s[i];
  const parseFactor = () => {
    if (peek() === '-') { i++; return -parseFactor(); }
    if (peek() === '+') { i++; return parseFactor(); }
    let v;
    if (peek() === '(') {
      i++;
      v = parseExpr();
      if (peek() !== ')') throw new Error('Unclosed bracket');
      i++;
    } else {
      const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
      if (!m) throw new Error('Expected number');
      v = parseFloat(m[0]);
      i += m[0].length;
    }
    while (peek() === '%') { i++; v /= 100; }
    return v;
  };
  const parseTerm = () => {
    let v = parseFactor();
    for (;;) {
      const c = peek();
      if (c === '*' || c === '/') {
        const op = s[i++];
        const r = parseFactor();
        if (op === '/' && r === 0) throw new Error('Divide by zero');
        v = op === '*' ? v * r : v / r;
      } else if (c === '(' || (c >= '0' && c <= '9') || c === '.') {
        // Implicit multiplication: a number or bracket group butted straight
        // up against the previous factor — 5(5), (2+3)5, (2)(3), 2(-5).
        v = v * parseFactor();
      } else {
        break;
      }
    }
    return v;
  };
  const parseExpr = () => {
    let v = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = s[i++];
      const r = parseTerm();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  };
  const v = parseExpr();
  if (i !== s.length) throw new Error('Unexpected input');
  if (!isFinite(v)) throw new Error('Divide by zero');
  // Trim float noise (0.1 + 0.2 → 0.3, not 0.30000000000000004)
  return Math.round(v * 1e10) / 1e10;
}

const CALC_KEYS = [
  ['C', '(', ')', '⌫'],
  ['7', '8', '9', '÷'],
  ['4', '5', '6', '×'],
  ['1', '2', '3', '−'],
  ['0', '.', '%', '+'],
];

// Floating BODMAS calculator, available anywhere while logged in (Alt+K or
// the topbar button). Keyboard input is handled on the panel itself — not a
// window listener — so it can't collide with other open popups' key handlers.
function CalculatorPanel({ onClose }) {
  const [expr, setExpr] = useState('');
  const [justEvaluated, setJustEvaluated] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, []);

  // Live preview of the running result; blank while the expression is
  // incomplete (e.g. ends in an operator).
  let preview = null;
  try {
    const v = calcEvaluate(expr);
    if (v !== null) preview = v.toLocaleString('en-AU', { maximumFractionDigits: 10 });
  } catch { /* incomplete expression — no preview */ }

  const equals = () => {
    try {
      const v = calcEvaluate(expr);
      if (v === null) return;
      setExpr(String(v));
      setJustEvaluated(true);
    } catch {
      setExpr('Error');
      setJustEvaluated(true);
    }
  };

  const press = (k) => {
    if (k === 'C') { setExpr(''); setJustEvaluated(false); return; }
    if (k === '⌫') { setExpr((p) => (p === 'Error' ? '' : p.slice(0, -1))); setJustEvaluated(false); return; }
    if (k === '=') { equals(); return; }
    setExpr((p) => {
      const base = p === 'Error' ? '' : p;
      // After '=', typing a digit starts fresh; typing an operator chains.
      if (justEvaluated && /[\d.]/.test(k)) return k;
      return base + k;
    });
    setJustEvaluated(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const onType = (e) => {
    const cleaned = e.target.value.replace(/[^0-9+\-*/().%×÷−\s]/g, '');
    setExpr(cleaned);
    setJustEvaluated(false);
  };

  // Toggle the sign of the number currently being typed (the trailing number
  // in the expression). A bare number flips in place: 100 → -100 → 100.
  // Mid-expression, the number wraps in brackets to keep BODMAS exact —
  // 100+90 → 100+(-90) → 100+90 — leaving everything before it untouched.
  const toggleSign = () => {
    setJustEvaluated(false);
    setExpr((p) => {
      if (!p || p === 'Error') return p;
      // Bracketed negative at the end: (-90) → 90
      let m = p.match(/\((?:-|−)(\d*\.?\d+)\)$/);
      if (m) return p.slice(0, -m[0].length) + m[1];
      // Whole expression is one negative number: -100 → 100
      m = p.match(/^(?:-|−)(\d*\.?\d+)$/);
      if (m) return m[1];
      // Trailing positive number
      m = p.match(/(\d*\.?\d+)$/);
      if (m) {
        const head = p.slice(0, -m[0].length);
        if (!head) return '-' + m[1];        // bare number: 100 → -100
        return head + `(-${m[1]})`;          // mid-expression: 100+90 → 100+(-90)
      }
      return p;
    });
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
    if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); equals(); return; }
    // 'C' / 'c' clears everything, matching the on-screen C key.
    if (e.key === 'c' || e.key === 'C') { e.preventDefault(); setExpr(''); setJustEvaluated(false); return; }
    // 'V' / 'v' toggles ± on the number being typed.
    if (e.key === 'v' || e.key === 'V') { e.preventDefault(); toggleSign(); return; }
  };

  return (
    <MovablePanel title="Calculator" onClose={onClose} width={300}>
      <div className="hn-browse-body" onKeyDown={onKeyDown} style={{ padding: '14px' }}>
        <div className="hn-calc-screen">
          <input
            ref={inputRef}
            className="hn-calc-display hn-mono"
            value={expr}
            onChange={onType}
            placeholder="0"
            spellCheck={false}
            autoComplete="off"
          />
          <div className="hn-calc-preview hn-mono">{expr && expr !== 'Error' && preview !== null && preview !== expr ? `= ${preview}` : '\u00A0'}</div>
        </div>
        <div className="hn-calc-grid">
          {CALC_KEYS.flat().map((k) => (
            <button
              key={k}
              type="button"
              className={`hn-calc-btn ${'÷×−+%()'.includes(k) ? 'op' : ''} ${k === 'C' || k === '⌫' ? 'fn' : ''}`}
              onClick={() => press(k)}
            >
              {k}
            </button>
          ))}
          <button type="button" className="hn-calc-btn eq" onClick={equals}>=</button>
        </div>
        <div className="hn-browse-footer" style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          <span><kbd className="hn-kbd-inline">↵</kbd> Equals · <kbd className="hn-kbd-inline">C</kbd> Clear · <kbd className="hn-kbd-inline">V</kbd> ±</span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Close · <kbd className="hn-kbd-inline">⌥K</kbd> Toggle</span>
        </div>
      </div>
    </MovablePanel>
  );
}

// ─── Notepad (Alt+N) ────────────────────────────────────────────────────────
// Floating scratchpad. The text lives in App state, so closing the panel
// (Esc or X) keeps the note — it only clears when the operator logs out.
function NotepadPanel({ text, onChange, onClose }) {
  const taRef = useRef(null);
  useEffect(() => {
    if (taRef.current) {
      taRef.current.focus();
      // Put the caret at the end of any existing note.
      const len = taRef.current.value.length;
      taRef.current.setSelectionRange(len, len);
    }
  }, []);

  return (
    <MovablePanel title="Notepad" onClose={onClose} width={340}>
      <div
        className="hn-browse-body"
        style={{ padding: '12px' }}
        onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } }}
      >
        <textarea
          ref={taRef}
          className="hn-notepad-area"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={'Jot anything down — customer numbers, stock codes, reminders…\n\nNotes stay until you log out.'}
          spellCheck={false}
        />
        <div className="hn-browse-footer" style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          <span className="hn-mono" style={{ fontSize: '10.5px' }}>{text.length} chars</span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Close (kept) · <kbd className="hn-kbd-inline">⌥N</kbd> Toggle</span>
        </div>
      </div>
    </MovablePanel>
  );
}

// ─── Security screensaver / inactivity lock ─────────────────────────────────
// Full-screen lock shown after LOCK_TIMEOUT_MS of inactivity, or on demand
// via the topbar Lock button. Unlocking requires an
// operator number + password. onUnlock(op, pwd) returns an error string, or
// '' on success — the same-operator / different-operator branching lives in
// the App so it can reach session state.
function LockScreen({ currentOperator, onUnlock }) {
  const [op, setOp] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const opRef = useRef(null);
  const pwdRef = useRef(null);

  useEffect(() => { if (opRef.current) opRef.current.focus(); }, []);

  const submit = () => {
    const err = onUnlock(op.trim(), pwd);
    if (err) { setError(err); return; }
    setError('');
  };

  const opName = OPERATOR_NAMES[currentOperator];

  return (
    <div className="hn-lock-overlay">
      <div className="hn-lock-clock">
        <div className="hn-lock-time hn-mono"><LiveClock /></div>
        <div className="hn-lock-date"><LiveClock type="date" /></div>
      </div>
      <div className="hn-lock-panel" onKeyDown={(e) => handleEnterAdvance(e, submit)}>
        <div className="hn-lock-head">
          <span className="hn-lock-icon"><LockKeyhole size={20} strokeWidth={1.75} /></span>
          <div>
            <div className="hn-serif" style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1.1 }}>Terminal locked</div>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
              Locked after 2 minutes of inactivity, or manually. Session:{' '}
              <span className="hn-mono" style={{ fontWeight: 600 }}>{currentOperator}</span>
              {opName && <> · {opName}</>}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '18px' }}>
          <div>
            <label className="hn-field-label">Operator Number</label>
            <div className="hn-input-wrap">
              <User2 size={16} className="hn-input-icon" strokeWidth={1.75} />
              <input
                ref={opRef}
                className="hn-input hn-mono"
                value={op}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setOp(v);
                  // Jump to the password field the moment 4 digits are in.
                  if (v.length === 4 && pwdRef.current) pwdRef.current.focus();
                }}
                placeholder="4-digit operator"
                inputMode="numeric"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <label className="hn-field-label">Password</label>
            <div className="hn-input-wrap">
              <KeyRound size={16} className="hn-input-icon" strokeWidth={1.75} />
              <input
                ref={pwdRef}
                className="hn-input"
                type={showPwd ? 'text' : 'password'}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Password"
                autoComplete="off"
                data-enter-submit="true"
              />
              <button
                type="button"
                className="hn-lock-eye"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
                tabIndex={-1}
              >
                {showPwd ? <EyeOff size={15} strokeWidth={1.75} /> : <Eye size={15} strokeWidth={1.75} />}
              </button>
            </div>
          </div>
          {error && <div className="hn-lock-error">{error}</div>}
          <button type="button" className="hn-lock-unlock" onClick={submit}>
            Unlock terminal
          </button>
          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-faint)', textAlign: 'center' }}>
            A different operator's credentials will end the current session and start theirs.
          </p>
        </div>
      </div>
    </div>
  );
}


function ConfirmCustomerDialog({ customer, onConfirm, onCancel }) {
  const [answer, setAnswer] = useState('Y');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') { e.preventDefault(); onCancel(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onCancel]);

  const submit = () => {
    if (answer.trim().toUpperCase() === 'Y') onConfirm();
    else onCancel();
  };

  return (
    <MovablePanel title="Confirm Customer" onClose={onCancel} width={440}>
      <div className="hn-browse-body">
        <div style={{ marginBottom: '14px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '4px' }}>Customer</div>
          <div className="hn-serif" style={{ fontSize: '22px', fontWeight: 500, lineHeight: 1.1 }}>
            {customer.firstName} {customer.lastName}
          </div>
        </div>
        <div className="hn-detail-grid">
          <div className="hn-detail">
            <span className="hn-detail-label">Customer Number</span>
            <span className="hn-detail-value hn-mono">{customer.id}</span>
          </div>
          <div className="hn-detail">
            <span className="hn-detail-label">Address</span>
            <span className="hn-detail-value">{customer.address}</span>
          </div>
          <div className="hn-detail">
            <span className="hn-detail-label">Mobile</span>
            <span className="hn-detail-value hn-mono">{customer.mobile || '—'}</span>
          </div>
          <div className="hn-detail">
            <span className="hn-detail-label">Phone</span>
            <span className="hn-detail-value hn-mono">{customer.phone || '—'}</span>
          </div>
        </div>
        <div className="hn-confirm-row">
          <span style={{ fontSize: '14px', fontWeight: 500 }}>Confirm customer?</span>
          <input
            ref={inputRef}
            className="hn-confirm-input hn-mono"
            value={answer}
            maxLength={1}
            onChange={(e) => setAnswer(e.target.value.toUpperCase().replace(/[^YN]/g, ''))}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          />
          <span className="hn-confirm-hint">Y / N</span>
        </div>
      </div>
      <div className="hn-browse-footer">
        <span><kbd className="hn-kbd-inline">↵</kbd> Confirm</span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Back</span>
      </div>
    </MovablePanel>
  );
}

function MultiResultsDialog({ results, onSelect, onCancel }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onCancel(); return; }
      const n = parseInt(e.key, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= results.length) {
        e.preventDefault();
        onSelect(results[n - 1]);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [results, onSelect, onCancel]);

  return (
    <MovablePanel title="Select Customer" onClose={onCancel} width={460}>
      <div className="hn-browse-body">
        <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
          {results.length} accounts found at this address. Pick one to continue.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {results.map((c, i) => (
            <button key={c.id} type="button" className="hn-result-row" onClick={() => onSelect(c)}>
              <span className="hn-keycap" style={{ width: 38, height: 38, fontSize: 16, borderRadius: 8 }}>{i + 1}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{c.firstName} {c.lastName}</span>
                <span className="hn-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.id} · {c.mobile || c.phone}</span>
              </span>
              <ArrowUpRight size={16} className="hn-arrow" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>
      <div className="hn-browse-footer">
        <span><kbd className="hn-kbd-inline">1–{results.length}</kbd> Select</span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Back</span>
      </div>
    </MovablePanel>
  );
}

function NotesDialog({ notes, onChange, onClose }) {
  const taRef = useRef(null);
  useEffect(() => { if (taRef.current) taRef.current.focus(); }, []);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <MovablePanel title="Invoice Notes · Alt + F3" onClose={onClose} width={460}>
      <div className="hn-browse-body">
        <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
          Add or edit notes for this invoice. Notes save as you type.
        </p>
        <textarea
          ref={taRef}
          className="hn-notes-area"
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. Customer requested weekend delivery; call before arrival."
        />
      </div>
      <div className="hn-browse-footer">
        <span>{notes.trim().length} characters</span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Done</span>
      </div>
    </MovablePanel>
  );
}

// ─── Payment type dialog (Alt + T / Option + T) ─────────────────────────────
const PAYMENT_TYPES = [
  { id: 'cash', label: 'Cash' },
  { id: 'card', label: 'Card' },
  { id: 'latitude', label: 'Latitude' },
];

function PaymentTypeDialog({ current, onSelect, onClose }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      const n = parseInt(e.key, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= PAYMENT_TYPES.length) {
        e.preventDefault();
        onSelect(PAYMENT_TYPES[n - 1].id);
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onSelect, onClose]);

  return (
    <MovablePanel title="Payment Type · Alt + T" onClose={onClose} width={400}>
      <div className="hn-browse-body">
        <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
          Choose how this invoice will be paid.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {PAYMENT_TYPES.map((p, i) => {
            const active = current === p.id;
            return (
              <button
                key={p.id}
                type="button"
                className={`hn-result-row ${active ? 'active' : ''}`}
                onClick={() => onSelect(p.id)}
              >
                <span className="hn-keycap" style={{ width: 38, height: 38, fontSize: 16, borderRadius: 8 }}>{i + 1}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{p.label}</span>
                  {active && <span style={{ fontSize: '11px', color: 'var(--accent)' }}>Current selection</span>}
                </span>
                <ArrowUpRight size={16} className="hn-arrow" strokeWidth={1.75} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="hn-browse-footer">
        <span><kbd className="hn-kbd-inline">1–{PAYMENT_TYPES.length}</kbd> Select</span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Close</span>
      </div>
    </MovablePanel>
  );
}

// ─── Reassign salesperson dialog (Alt + S / Option + S) ─────────────────────
function SalespersonDialog({ currentOperator, onAssign, onClose }) {
  const [value, setValue] = useState(currentOperator || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) { inputRef.current.focus(); inputRef.current.select(); }
  }, []);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const resolvedName = OPERATOR_NAMES[value] || null;
  const valid = /^\d{4}$/.test(value);

  const submit = () => {
    if (!valid) return;
    onAssign(value);
  };

  return (
    <MovablePanel title="Reassign Salesperson · Alt + S" onClose={onClose} width={400}>
      <div className="hn-browse-body">
        <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
          Enter the operator number this invoice should be assigned to. No password needed.
        </p>
        <div className="hn-browse-search-row">
          <User2 size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={4}
            className="hn-browse-input hn-mono"
            placeholder="4-digit operator number"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/\D/g, '').slice(0, 4))}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
          />
          <span className="hn-mode-tag">OP</span>
        </div>
        <div style={{ marginTop: '12px', minHeight: '20px', fontSize: '13px', color: resolvedName ? 'var(--text)' : 'var(--text-faint)' }}>
          {value.length === 4
            ? (resolvedName || 'Operator number not recognised — it will still be assigned.')
            : 'Type a 4-digit operator number.'}
        </div>
      </div>
      <div className="hn-browse-footer">
        <span><kbd className="hn-kbd-inline">↵</kbd> Assign</span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Close</span>
      </div>
    </MovablePanel>
  );
}

// ─── Product Groups dialog (Alt + G) ─────────────────────────────────────────
// Three-level accordion: department → section → category.
// Lets operators browse unfamiliar products without needing a code or keyword.
function ProductGroupsDialog({ isOpen, onClose }) {
  const [openDept, setOpenDept]   = useState(null); // key of open department
  const [openSect, setOpenSect]   = useState(null); // label of open section
  const { position, isDragging, handleDragStart } = useDraggable(() => ({
    x: Math.max(20, (window.innerWidth - 820) / 2),
    y: Math.max(20, (window.innerHeight - 560) / 3),
  }));

  useEffect(() => {
    if (!isOpen) { setOpenDept(null); setOpenSect(null); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      // Number keys open the matching department row (first column). PRODUCT_GROUPS
      // keys are the printed row numbers, so this is a direct lookup.
      if (/^\d$/.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const dept = PRODUCT_GROUPS.find((d) => d.key === e.key);
        if (dept) {
          e.preventDefault();
          setOpenDept((prev) => (prev === dept.key ? null : dept.key));
          setOpenSect(null);
        }
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  const toggleDept = (key) => {
    setOpenDept((prev) => (prev === key ? null : key));
    setOpenSect(null);
  };
  const toggleSect = (label) => {
    setOpenSect((prev) => (prev === label ? null : label));
  };

  if (!isOpen) return null;

  const activeDept = PRODUCT_GROUPS.find((d) => d.key === openDept) || null;

  return (
    <div className="hn-browse-overlay">
      <div
        className="hn-browse-dialog hn-fade-in"
        style={{ left: position.x + 'px', top: position.y + 'px', width: '820px' }}
      >
        {/* Draggable header */}
        <div
          className="hn-browse-header"
          onMouseDown={handleDragStart}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GripHorizontal size={14} strokeWidth={1.75} style={{ opacity: 0.55 }} />
            <span className="hn-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>
              Product Groups · Alt + G
            </span>
          </div>
          <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close product groups">
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="hn-browse-body" style={{ padding: 0 }}>
          <div className="hn-pg-layout">

            {/* LEFT COLUMN — departments */}
            <div className="hn-pg-col hn-pg-col-dept">
              <div className="hn-pg-col-head">Department</div>
              {PRODUCT_GROUPS.map((dept) => {
                const active = openDept === dept.key;
                return (
                  <button
                    key={dept.key}
                    type="button"
                    className={`hn-pg-row hn-pg-dept-row ${active ? 'active' : ''}`}
                    onClick={() => toggleDept(dept.key)}
                  >
                    <span className="hn-pg-num">{dept.key}</span>
                    <span className="hn-pg-label">{dept.label}</span>
                    <ChevronRight size={14} strokeWidth={2} className={`hn-pg-chev ${active ? 'open' : ''}`} />
                  </button>
                );
              })}
            </div>

            {/* MIDDLE COLUMN — sections (only when a dept is open) */}
            <div className={`hn-pg-col hn-pg-col-sect ${activeDept ? 'visible' : ''}`}>
              {activeDept ? (
                <>
                  <div className="hn-pg-col-head">{activeDept.label}</div>
                  {activeDept.sections.map((sect) => {
                    const active = openSect === sect.label;
                    const hasChildren = sect.categories.length > 0;
                    return (
                      <button
                        key={sect.label}
                        type="button"
                        className={`hn-pg-row hn-pg-sect-row ${active ? 'active' : ''} ${!hasChildren ? 'leaf' : ''}`}
                        onClick={() => hasChildren ? toggleSect(sect.label) : undefined}
                        style={{ cursor: hasChildren ? 'pointer' : 'default' }}
                      >
                        <span className="hn-pg-dot" />
                        <span className="hn-pg-label">{sect.label}</span>
                        {hasChildren && (
                          <ChevronRight size={13} strokeWidth={2} className={`hn-pg-chev ${active ? 'open' : ''}`} />
                        )}
                      </button>
                    );
                  })}
                </>
              ) : (
                <div className="hn-pg-empty-col">
                  <span>Select a department</span>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN — categories (only when a section with children is open) */}
            <div className={`hn-pg-col hn-pg-col-cat ${openSect ? 'visible' : ''}`}>
              {openSect ? (
                <>
                  <div className="hn-pg-col-head">{openSect}</div>
                  {(activeDept?.sections.find((s) => s.label === openSect)?.categories || []).map((cat) => (
                    <div key={cat} className="hn-pg-row hn-pg-cat-row">
                      <span className="hn-pg-cat-dash">—</span>
                      <span className="hn-pg-label">{cat}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="hn-pg-empty-col">
                  <span>Select a section</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="hn-browse-footer">
          <span>Click a department, then a section to explore categories.</span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

// ─── New Ticket dialog (Customer Service Tickets → Add New Ticket) ───────────
function NewTicketDialog({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    source: 'Phone', type: '', assignTo: 'MIKAEL', priority: '', status: 'Open',
    movex: 'L3M', subject: '', description: '', invoice: '', altInvoice: false,
    product: '', dept: '', quantity: '1.00',
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!isOpen) {
      setForm({
        source: 'Phone', type: '', assignTo: 'MIKAEL', priority: '', status: 'Open',
        movex: 'L3M', subject: '', description: '', invoice: '', altInvoice: false,
        product: '', dept: '', quantity: '1.00',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      // Number keys open the matching department row (first column). PRODUCT_GROUPS
      // keys are the printed row numbers, so this is a direct lookup.
      if (/^\d$/.test(e.key) && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const dept = PRODUCT_GROUPS.find((d) => d.key === e.key);
        if (dept) {
          e.preventDefault();
          setOpenDept((prev) => (prev === dept.key ? null : dept.key));
          setOpenSect(null);
        }
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canCreate = form.subject.trim() && form.type;

  return (
    <MovablePanel title="New Ticket" onClose={onClose} width={620}>
      <div className="hn-browse-body">
        <div className="hn-nt-grid">
          <label className="hn-nt-field">
            <span className="hn-nt-label">Source</span>
            <select className="hn-nt-input" value={form.source} onChange={(e) => update('source', e.target.value)}>
              {CST_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Priority</span>
            <select className="hn-nt-input" value={form.priority} onChange={(e) => update('priority', e.target.value)}>
              <option value="">—</option>
              {CST_PRIORITIES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Type</span>
            <select className="hn-nt-input" value={form.type} onChange={(e) => update('type', e.target.value)}>
              <option value="">—</option>
              {CST_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Status</span>
            <select className="hn-nt-input" value={form.status} onChange={(e) => update('status', e.target.value)}>
              {CST_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Assign To</span>
            <input className="hn-nt-input" value={form.assignTo} onChange={(e) => update('assignTo', e.target.value)} />
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Movex</span>
            <input className="hn-nt-input" value={form.movex} onChange={(e) => update('movex', e.target.value)} />
          </label>
        </div>

        <label className="hn-nt-field" style={{ marginTop: '12px' }}>
          <span className="hn-nt-label">Subject</span>
          <input className="hn-nt-input" value={form.subject} onChange={(e) => update('subject', e.target.value)} placeholder="Short summary of the issue" />
        </label>
        <label className="hn-nt-field" style={{ marginTop: '12px' }}>
          <span className="hn-nt-label">Description</span>
          <textarea className="hn-nt-textarea" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Full description of the fault / request" />
        </label>

        <div className="hn-nt-divider" />

        <div className="hn-nt-grid">
          <label className="hn-nt-field">
            <span className="hn-nt-label">Invoice</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <label className="hn-nt-alt">
                <input type="checkbox" checked={form.altInvoice} onChange={(e) => update('altInvoice', e.target.checked)} />
                <span>Alt</span>
              </label>
              <input className="hn-nt-input" style={{ flex: 1 }} value={form.invoice} onChange={(e) => update('invoice', e.target.value)} placeholder="Retrieve an invoice…" />
            </div>
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Dept</span>
            <input className="hn-nt-input" value={form.dept} onChange={(e) => update('dept', e.target.value)} />
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Product</span>
            <input className="hn-nt-input" value={form.product} onChange={(e) => update('product', e.target.value)} placeholder="Enter product code" />
          </label>
          <label className="hn-nt-field">
            <span className="hn-nt-label">Quantity</span>
            <input className="hn-nt-input hn-mono" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} />
          </label>
        </div>

        <div className="hn-nt-actions">
          <button type="button" className="hn-btn-primary" style={{ width: 'auto', padding: '11px 22px' }} disabled={!canCreate} onClick={() => onCreate(form)}>
            Create Ticket
          </button>
          <button type="button" className="hn-btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
      <div className="hn-browse-footer">
        <span>Source, Type and Subject identify the ticket.</span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Cancel</span>
      </div>
    </MovablePanel>
  );
}

// ─── Open Ticket dialog (full ticket detail) ─────────────────────────────────
function OpenTicketDialog({ ticket, onClose }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!ticket) return null;
  const t = ticket;

  return (
    <div className="hn-browse-overlay hn-modal-scrim" style={{ zIndex: 950 }}>
      <div className="hn-ot-dialog hn-fade-in">
        {/* Header */}
        <div className="hn-ot-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="hn-ot-ticketlabel">Ticket #</span>
            <span className="hn-mono hn-ot-ticketno">{t.ticketNo}</span>
            <span className="hn-ot-customer hn-serif">{t.customer.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className={`hn-cst-state ${
              t.state === 'Critical' ? 'critical' : t.state === 'In Progress' ? 'inprogress' : t.state === 'Follow Up' ? 'followup' : 'default'
            }`}>{t.state}</span>
            <button type="button" className="hn-browse-close" onClick={onClose} aria-label="Close ticket">
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="hn-ot-body">
          {/* Left rail — quick facts */}
          <div className="hn-ot-rail">
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Priority</span><span className="hn-cst-dv">◆ {t.priority}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Type</span><span className="hn-cst-dv">△ {t.type}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Status</span><span className="hn-cst-dv">{t.status}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Source</span><span className="hn-cst-dv">{t.source}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Assigned To</span><span className="hn-cst-dv hn-mono">{t.assignedTo}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Original Invoice</span><span className="hn-cst-dv hn-mono">{t.invoiceNo}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Sales Person</span><span className="hn-cst-dv hn-mono">{t.salesPerson}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Ticket Raised</span><span className="hn-cst-dv hn-mono">{t.raised}</span></div>
            <div className="hn-ot-rail-item"><span className="hn-detail-label">Last Update</span><span className="hn-cst-dv hn-mono">{t.lastUpdate}</span></div>
          </div>

          {/* Main content */}
          <div className="hn-ot-content">
            {/* Top: subject/desc + customer */}
            <div className="hn-ot-two">
              <div className="hn-oo-card">
                <div className="hn-oo-card-head">Ticket</div>
                <div className="hn-cst-detail-subject">
                  <div><span className="hn-detail-label">Subject</span><span className="hn-cst-subject-val">{t.subject}</span></div>
                  <div><span className="hn-detail-label">Description</span><span className="hn-cst-desc-val">{t.description}</span></div>
                </div>
              </div>
              <div className="hn-oo-card">
                <div className="hn-oo-card-head">Customer Summary</div>
                <div className="hn-cst-cust">
                  <div className="hn-oo-name">{t.customer.name}</div>
                  <div style={{ whiteSpace: 'pre-line', fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>{t.customer.address}</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Mobile: <span className="hn-mono" style={{ color: 'var(--text)' }}>{t.customer.mobile}</span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                    Email: <span style={{ color: 'var(--text)' }}>{t.customer.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product */}
            <div className="hn-oo-card">
              <div className="hn-cst-prod-head">
                <span>Product</span>
                <button type="button" className="hn-cst-link">Supplier Contacts</button>
              </div>
              <div className="hn-cst-prod-body">
                <div className="hn-cst-prod-col">
                  <div className="hn-mono" style={{ fontWeight: 600, marginBottom: '6px' }}>{t.dept} {t.productCode}  {t.productName}</div>
                  <div className="hn-cst-prodline">Qty: <span className="hn-mono">{t.qty}.00</span> · Booked Out: <span className="hn-mono">{t.product.bookedOut}</span> {t.product.bookedAgo && <span style={{ color: 'var(--text-faint)' }}>({t.product.bookedAgo})</span>}</div>
                  <div className="hn-cst-prodline">Brand: {t.product.brand}</div>
                  <div className="hn-cst-prodline">Group: <span className="hn-mono">{t.product.group}</span></div>
                  <div className="hn-cst-prodline">Supplier: {t.product.supplier}</div>
                  <div className="hn-cst-prodline hn-mono" style={{ fontSize: '11.5px' }}>P: {t.product.supplierPhone}  F: {t.product.supplierFax}</div>
                </div>
                <div className="hn-cst-prod-col">
                  <div className="hn-cst-prodline">Fault Type: {t.product.faultType}</div>
                  <div className="hn-cst-prodline">Installed: {t.product.installed}</div>
                  <div className="hn-cst-prodline">Serial: <span className="hn-mono">{t.product.serial}</span></div>
                  <div className="hn-cst-prodline">Location: {t.product.location}</div>
                  <div className="hn-cst-prodline">Condition: {t.product.condition}</div>
                  <div className="hn-cst-prodline">Fault Observed: {t.product.faultObserved}</div>
                </div>
              </div>
            </div>

            {/* Warranty */}
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Manufacturer's Warranty</div>
              <div className="hn-ot-warranty">
                <div><span className="hn-detail-label">Warranty Period</span><span className="hn-cst-dv">{t.warranty.period}</span></div>
                <div><span className="hn-detail-label">Start Date</span><span className="hn-cst-dv hn-mono">{t.warranty.startDate}</span></div>
                <div><span className="hn-detail-label">Status</span><span className="hn-cst-dv" style={{ color: 'var(--success)' }}>{t.warranty.status}</span></div>
              </div>
            </div>

            {/* History Log */}
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">History Log</div>
              <div className="hn-cst-history">
                {t.history.map((h, i) => (
                  <div key={i} className="hn-cst-history-row hn-mono">{h}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="hn-ot-footer">
          <div className="hn-ot-footer-group">
            <span className="hn-ot-footer-label">Communication</span>
            <div className="hn-ot-iconrow">
              <button type="button" className="hn-ot-icon" title="Edit note"><Search size={14} strokeWidth={1.75} /></button>
              <button type="button" className="hn-ot-icon" title="Email">@</button>
              <button type="button" className="hn-ot-icon" title="SMS">SMS</button>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <button type="button" className="hn-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── Invoice feature placeholder dialog ──────────────────────────────────────
// F3 Order Detail, F11 Product Items, F2 Modify Product, Alt+F11 Tape — these
// are real terminal functions that need line-item / SAP data to be meaningful.
// Until that's wired up, this shows what each does so the shortcut is discoverable.
const INVOICE_FEATURES = {
  orderDetail:   { key: 'F3',    title: 'Order Detail', desc: 'View and edit delivery, dispatch and order-level details for this invoice — delivery date, dispatch method, freight and special instructions.' },
  productItems:  { key: 'F11',   title: 'Product Items', desc: 'Open the full product-items view for this invoice: per-line stock allocation, serial numbers, delivery status and pricing breakdown.' },
  modifyProduct: { key: 'F2',    title: 'Modify Product', desc: 'Modify the currently selected line item — change quantity, price override, discount, department or allocation.' },
  tape:          { key: 'Alt+F11', title: 'Tape', desc: 'Show the running transaction tape — a line-by-line audit of every scan, price change and adjustment made on this invoice.' },
};

function InvoiceFeatureDialog({ feature, onClose }) {
  const f = INVOICE_FEATURES[feature] || { key: '', title: 'Feature', desc: '' };
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') { e.preventDefault(); onClose(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <MovablePanel title={`${f.title} · ${f.key}`} onClose={onClose} width={440}>
      <div className="hn-browse-body">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span className="hn-keycap" style={{ width: 'auto', minWidth: 52, height: 44, fontSize: 15, padding: '0 14px', borderRadius: 10 }}>{f.key}</span>
          <h3 className="hn-serif" style={{ margin: 0, fontSize: '22px', fontWeight: 500 }}>{f.title}</h3>
        </div>
        <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.55, color: 'var(--text-muted)' }}>{f.desc}</p>
        <div style={{ marginTop: '16px', padding: '12px 14px', background: 'var(--accent-soft)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '8px', fontSize: '12.5px', color: 'var(--accent)' }}>
          This connects to live line-item data once SAP is wired up. The shortcut and screen are in place and ready.
        </div>
      </div>
      <div className="hn-browse-footer">
        <span>Shortcut <kbd className="hn-kbd-inline">{f.key}</kbd></span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Close</span>
      </div>
    </MovablePanel>
  );
}

function CreateCustomerScreen({ prefill, breadcrumb, onCreate, onCancel }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: prefill.phone || '',
    phone: '',
    address: prefill.address || '',
    deliveryAddress: '',
  });

  const firstRef = useRef(null);

  useEffect(() => { if (firstRef.current) firstRef.current.focus(); }, []);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const canCreate = form.firstName.trim() && form.lastName.trim() && (form.mobile.trim() || form.phone.trim());

  const submit = () => {
    if (!canCreate) return;
    const id = 'CU' + Math.floor(100000 + Math.random() * 899999);
    onCreate({
      id,
      firstName:       form.firstName.trim(),
      lastName:        form.lastName.trim(),
      email:           form.email.trim(),
      mobile:          form.mobile.trim(),
      phone:           form.phone.trim(),
      address:         form.address.trim(),
      deliveryAddress: form.deliveryAddress.trim() || form.address.trim(),
    });
  };

  return (
    <main className="hn-screen" style={{ maxWidth: '600px' }}>
      <div className="hn-fade-in" style={{ marginBottom: '24px' }}>
        <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
        <h1 className="hn-serif hn-screen-title">Create customer</h1>
        <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          No existing account found. Fill in their details — press <kbd className="hn-kbd-inline">↵</kbd> to advance through each field.
        </p>
      </div>

      <div
        className="hn-card hn-fade-in"
        style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        onKeyDown={(e) => handleEnterAdvance(e, submit)}
      >
        {/* Row 1: First / Last */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: '1 1 0' }}>
            <label className="hn-field-label">First name *</label>
            <input
              ref={firstRef}
              className="hn-input"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
            />
          </div>
          <div style={{ flex: '1 1 0' }}>
            <label className="hn-field-label">Last name *</label>
            <input
              className="hn-input"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: Email */}
        <div>
          <label className="hn-field-label">Email</label>
          <input
            className="hn-input hn-mono"
            placeholder="name@example.com"
            inputMode="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </div>

        {/* Row 3: Mobile / Phone */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: '1 1 0' }}>
            <label className="hn-field-label">Mobile</label>
            <input
              className="hn-input hn-mono"
              inputMode="tel"
              value={form.mobile}
              onChange={(e) => update('mobile', e.target.value)}
            />
          </div>
          <div style={{ flex: '1 1 0' }}>
            <label className="hn-field-label">Phone</label>
            <input
              className="hn-input hn-mono"
              inputMode="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </div>
        </div>

        {/* Row 4: House address */}
        <div>
          <label className="hn-field-label">House address</label>
          <input
            className="hn-input"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
          />
        </div>

        {/* Row 5: Delivery address */}
        <div>
          <label className="hn-field-label">Delivery address</label>
          <input
            className="hn-input"
            placeholder="Leave blank to use house address"
            value={form.deliveryAddress}
            onChange={(e) => update('deliveryAddress', e.target.value)}
            data-enter-submit="true"
          />
        </div>

        {/* Submit */}
        <div style={{ paddingTop: '4px' }}>
          <button
            type="button"
            className="hn-btn-primary"
            onClick={submit}
            disabled={!canCreate}
          >
            Create customer
            <ArrowUpRight size={16} strokeWidth={2} />
          </button>
          <span className="hn-field-hint" style={{ marginTop: '10px', display: 'block' }}>
            * First name, last name and at least one contact number are required.
          </span>
        </div>
      </div>

      <div className="hn-screen-footer">
        <span><LiveClock type="date" /></span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Find a customer</span>
      </div>
    </main>
  );
}

// ─── Stylesheet ──────────────────────────────────────────────────────────────
// Hoisted to module scope: built once at load, stable identity across renders,
// so the <style> text node is never re-created or re-diffed by React.
const HN_STYLES = `
        .hn-app {
          --bg: #F8FAFC;
          --surface: #FFFFFF;
          --text: #0F172A;
          --text-muted: #475569;
          --text-faint: #94A3B8;
          --accent: #2563EB;
          --accent-soft: #DBEAFE;
          --border: #E2E8F0;
          --border-strong: #0F172A;
          --error: #B91C1C;
          --error-bg: #FEF2F2;
          --success: #15803D;
          /* Fixed dark navy for accent bars (dialog headers, section heads,
             ledger panel) that always carry white text — deliberately NOT
             tied to --text, so they stay readable no matter the theme. */
          --header-dark: #0F172A;
          --header-dark-text: #FFFFFF;

          font-family: 'Segoe UI', Arial, sans-serif;
          color: var(--text);
          background: var(--bg);
          min-height: 100vh;
          font-feature-settings: 'ss01', 'cv11';
          -webkit-font-smoothing: antialiased;
        }

        /* ============== DARK MODE (per-operator, toggled in the topbar) ====
           A refined charcoal/slate palette rather than pure black or navy —
           easier on the eyes for long shifts, with enough warmth to avoid
           feeling clinical. Everything using the CSS variables re-skins
           automatically; the handful of rules below patch elements that
           carry fixed white text (dialog headers etc.) via --header-dark,
           which stays constant across both themes on purpose. */
        .hn-app[data-theme="dark"] {
          --bg: #17191F;
          --surface: #1F222B;
          --text: #EDEEF2;
          --text-muted: #9CA3B0;
          --text-faint: #676D7A;
          --accent: #5B93FF;
          --accent-soft: rgba(91, 147, 255, 0.16);
          --border: #2B2E38;
          --border-strong: #454A58;
          --error: #F87171;
          --error-bg: rgba(248, 113, 113, 0.10);
          --success: #4ADE80;
          --header-dark: #10121A;
        }
        .hn-app[data-theme="dark"] .hn-card,
        .hn-app[data-theme="dark"] .hn-browse-dialog {
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.04) inset,
            0 4px 10px rgba(0, 0, 0, 0.35),
            0 22px 48px -12px rgba(0, 0, 0, 0.55);
        }
        .hn-app[data-theme="dark"] .hn-kpi-trend-track { background: rgba(255, 255, 255, 0.06); }
        /* Sidebar: deeper, desaturated slate-blue in dark mode so it recedes
           instead of glowing bright blue against the charcoal workspace. */
        .hn-app[data-theme="dark"] .hn-sidebar {
          background: linear-gradient(180deg, #1B2436 0%, #161D2B 55%, #121826 100%);
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow:
            inset 1px 0 0 rgba(255, 255, 255, 0.05),
            inset -1px 0 0 rgba(0, 0, 0, 0.20),
            2px 0 18px -10px rgba(0, 0, 0, 0.55);
        }
        .hn-app[data-theme="dark"] .hn-input,
        .hn-app[data-theme="dark"] .hn-pc-in,
        .hn-app[data-theme="dark"] .hn-calc-display,
        .hn-app[data-theme="dark"] .hn-notepad-area {
          background: var(--bg);
        }

        .hn-serif { font-family: Georgia, 'Times New Roman', serif; }
        .hn-mono { font-family: Consolas, 'Courier New', monospace; }

        .hn-bg-login {
          /* Same navy gradient as the security screensaver, so locking and
             logging in feel like the same surface. */
          background: linear-gradient(165deg, #0A1830 0%, #123058 55%, #0A1830 100%);
          position: relative;
        }
        .hn-bg-login::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 78%);
          pointer-events: none;
        }

        .hn-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 1) inset,
            0 1px 2px rgba(15, 23, 42, 0.04),
            0 12px 32px -8px rgba(15, 23, 42, 0.08);
        }

        .hn-bg-login .hn-card {
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 1) inset,
            0 4px 10px rgba(2, 8, 20, 0.35),
            0 22px 48px -12px rgba(2, 8, 20, 0.6);
        }

        .hn-input {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 15px;
          padding: 13px 14px 13px 42px;
          width: 100%;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
          letter-spacing: 0.01em;
        }
        .hn-input::placeholder { color: var(--text-faint); }
        .hn-input:focus {
          border-color: var(--text);
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }
        .hn-input-wrap { position: relative; }
        .hn-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }
        .hn-eye {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }
        .hn-eye:hover { color: var(--text); background: rgba(15, 23, 42, 0.04); }

        .hn-btn-primary {
          background: var(--accent);
          color: #FFFFFF;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 14px 24px;
          width: 100%;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          cursor: pointer;
          transition: background-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .hn-btn-primary:hover:not(:disabled) {
          background: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px -4px rgba(37, 99, 235, 0.35);
        }
        .hn-btn-primary:disabled {
          background: var(--border);
          color: var(--text-faint);
          cursor: not-allowed;
        }

        .hn-btn-ghost {
          background: var(--surface);
          color: var(--text-muted);
          font-family: 'Segoe UI', Arial, sans-serif;
          font-weight: 500;
          font-size: 13px;
          padding: 8px 14px;
          border: 1px solid var(--border);
          border-radius: 999px;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
          cursor: pointer;
          transition: color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .hn-btn-ghost:hover {
          color: var(--text);
          background: var(--bg);
          box-shadow: 0 4px 12px -6px rgba(15, 23, 42, 0.18);
        }
        .hn-btn-ghost.hn-glass-accent {
          background: linear-gradient(180deg, rgba(96, 165, 250, 0.28), rgba(37, 99, 235, 0.20));
          border-color: rgba(37, 99, 235, 0.32);
          color: var(--accent);
        }
        .hn-btn-ghost.hn-glass-accent:hover {
          background: linear-gradient(180deg, rgba(96, 165, 250, 0.40), rgba(37, 99, 235, 0.30));
          color: #1D4ED8;
        }

        .hn-keycap {
          background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%);
          color: #FFFFFF;
          font-family: Consolas, 'Courier New', monospace;
          font-weight: 700;
          font-size: 22px;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          flex-shrink: 0;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 -2px 0 rgba(0, 0, 0, 0.10),
            0 2px 4px rgba(15, 23, 42, 0.10);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative;
        }

        .hn-arrow { color: var(--text-faint); margin-left: auto; transition: color 0.18s ease, transform 0.18s ease; }

        .hn-wordmark {
          font-family: Georgia, 'Times New Roman', serif;
          font-weight: 600;
          font-size: 22px;
          letter-spacing: 0.04em;
          line-height: 1;
        }
        .hn-eyebrow {
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .hn-divider-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--text-faint);
          vertical-align: middle;
          margin: 0 8px;
        }
        .hn-error {
          background: var(--error-bg);
          color: var(--error);
          border: 1px solid #FCA5A5;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
        }
        .hn-check {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: Consolas, 'Courier New', monospace;
          font-size: 11px;
          letter-spacing: 0.02em;
          color: var(--text-faint);
          transition: color 0.15s ease;
        }
        .hn-check.met { color: var(--success); }
        .hn-check-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.5;
        }
        .hn-check.met .hn-check-dot { opacity: 1; }

        /* Entrance animations removed entirely for performance on retail
           hardware: the fade/translate keyframe ran on ~46 elements at every
           screen change, forcing extra composite passes on low-power GPUs and
           adding ~300ms of perceived lag before content settled. Screens now
           appear instantly. The .hn-fade-in / .hn-stagger class names are
           kept in the JSX as no-op hooks so re-enabling is a one-line change. */

        .hn-amber-bar {
          height: 3px;
          width: 32px;
          background: var(--accent);
          border-radius: 2px;
        }

        /* ============== BROWSE DIALOG ============== */
        .hn-browse-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1000;
        }
        /* Logout confirmation panel.
           Centred by the flex scrim below rather than a translate() transform —
           flex centring keeps the transform property free (historically the
           entrance keyframe animated it) and costs nothing. */
        .hn-logout-prompt {
          pointer-events: auto;
          width: 360px;
          max-width: calc(100vw - 32px);
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: 16px;
          padding: 28px 28px 20px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 1) inset,
            0 4px 8px rgba(15, 23, 42, 0.10),
            0 14px 28px -10px rgba(15, 23, 42, 0.30);
        }
        /* Dim scrim for modal overlays (logout prompt) — centres its child */
        .hn-browse-overlay.hn-modal-scrim {
          background: rgba(15, 23, 42, 0.35);
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .hn-browse-dialog {
          position: absolute;
          pointer-events: auto;
          width: 460px;
          max-width: calc(100vw - 32px);
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: 12px;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 1) inset,
            0 4px 8px rgba(15, 23, 42, 0.10),
            0 12px 24px -10px rgba(15, 23, 42, 0.28);
          overflow: hidden;
        }
        .hn-browse-dialog-wide {
          width: 1100px;
        }
        /* Alt+B Browse gets a taller body so the results area has room to breathe */
        .hn-browse-dialog-wide .hn-browse-body {
          min-height: 620px;
          display: flex;
          flex-direction: column;
        }
        .hn-browse-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 12px 14px;
          background: linear-gradient(180deg, var(--bg), var(--surface));
          border-bottom: 1px solid var(--border);
        }
        .hn-toolbar-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-faint);
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          padding: 6px 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: background-color 0.13s ease, color 0.13s ease, border-color 0.13s ease, box-shadow 0.13s ease, transform 0.08s ease;
        }
        /* Actions that actually do something read at full strength; the
           not-yet-connected ones sit back so the live tools are obvious. */
        .hn-toolbar-btn.live { color: var(--text-muted); }
        .hn-toolbar-btn:hover {
          background: var(--accent-soft);
          color: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 1px 3px rgba(37, 99, 235, 0.12);
          transform: translateY(-1px);
        }
        .hn-toolbar-btn:active { transform: translateY(0); }
        /* Primary = the workflow's headline tools (View, Pricing Calc) */
        .hn-toolbar-btn.primary {
          color: var(--accent);
          border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
          background: var(--accent-soft);
        }
        .hn-toolbar-btn.primary:hover {
          background: var(--accent);
          color: #FFFFFF;
          border-color: var(--accent);
        }
        .hn-toolbar-btn.active {
          background: var(--accent);
          color: #FFFFFF;
          border-color: var(--accent);
        }
        .hn-toolbar-key {
          display: inline-flex;
          align-items: center;
          padding: 1px 5px;
          border-radius: 5px;
          background: var(--bg);
          border: 1px solid var(--border);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: var(--text-faint);
        }
        .hn-toolbar-btn:hover .hn-toolbar-key,
        .hn-toolbar-btn.primary .hn-toolbar-key { background: rgba(37, 99, 235, 0.12); border-color: transparent; color: var(--accent); }
        .hn-toolbar-btn.active .hn-toolbar-key,
        .hn-toolbar-btn.primary:hover .hn-toolbar-key { background: rgba(255, 255, 255, 0.24); border-color: transparent; color: #FFFFFF; }
        .hn-access-key {
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 2px;
          text-decoration-thickness: 1.5px;
        }
        .hn-toolbar-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 15px;
          height: 15px;
          margin-left: 3px;
          padding: 0 4px;
          border-radius: 999px;
          background: var(--accent);
          color: #FFFFFF;
          font-size: 9.5px;
          font-weight: 700;
        }
        .hn-toolbar-btn.active .hn-toolbar-badge {
          background: rgba(255, 255, 255, 0.28);
        }

        /* Filters panel — Key Words / Supplier / Brand / Range / Hierarchy /
           Min Sell / Max Sell / SOH, matching the real terminal's layout.
           Pinned to the bottom of the dialog as a refinement step. */
        .hn-filters-panel {
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px dashed var(--border);
        }
        .hn-filters-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .hn-filters-title-text {
          display: inline-flex;
          align-items: center;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--text);
        }
        .hn-filters-clear {
          background: transparent;
          border: none;
          color: var(--accent);
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background-color 0.14s ease;
        }
        .hn-filters-clear:hover { background: var(--accent-soft); }
        .hn-filters-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .hn-filter-field {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 7px 10px 8px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
        }
        .hn-filter-field:focus-within {
          border-color: var(--accent);
          background: var(--surface);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }
        .hn-filter-label {
          font-family: Consolas, 'Courier New', monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 2px;
          transition: color 0.15s ease;
        }
        .hn-filter-field:focus-within .hn-filter-label { color: var(--accent); }
        .hn-filter-input {
          width: 100%;
          background: transparent;
          border: none;
          padding: 0;
          font-size: 13.5px;
          color: var(--text);
          outline: none;
        }
        .hn-filter-input::placeholder { color: var(--text-faint); }
        .hn-browse-header {
          background: var(--header-dark);
          color: #FFFFFF;
          padding: 9px 12px 9px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          user-select: none;
        }
        .hn-browse-close {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          border: none;
          width: 22px;
          height: 22px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .hn-browse-close:hover { background: rgba(255, 255, 255, 0.18); }
        .hn-browse-body { padding: 20px; }

        .hn-browse-modes {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 4px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .hn-mode-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 6px;
          font-size: 13.5px;
          color: var(--text-muted);
          transition: color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-mode-row.active {
          background: var(--surface);
          color: var(--text);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
        }
        .hn-mode-indicator {
          width: 12px;
          color: var(--accent);
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .hn-mode-label { font-weight: 500; }
        .hn-mode-popular {
          margin-left: auto;
          font-family: Consolas, 'Courier New', monospace;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-faint);
          background: var(--bg);
          padding: 2px 6px;
          border-radius: 999px;
          border: 1px solid var(--border);
        }
        .hn-mode-row.active .hn-mode-popular {
          color: var(--text);
          background: var(--accent-soft);
          border-color: var(--accent);
        }

        .hn-browse-idle {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--bg);
          border: 1px dashed var(--border);
          border-radius: 8px;
        }

        .hn-browse-search-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--accent);
          border-radius: 8px;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }
        .hn-browse-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-size: 14px;
          color: var(--text);
          letter-spacing: 0.02em;
          font-family: Consolas, 'Courier New', monospace;
        }
        .hn-browse-input::placeholder { color: var(--text-faint); font-family: 'Segoe UI', Arial, sans-serif; letter-spacing: 0; }
        .hn-mode-tag {
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: var(--accent);
          padding: 3px 8px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .hn-browse-results {
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid var(--border);
        }
        .hn-browse-results-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          font-size: 11px;
          color: var(--text-muted);
          font-family: Consolas, monospace;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .hn-browse-results-hint { white-space: nowrap; }

        /* Product results list */
        .hn-prod-list {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          max-height: 260px;
          overflow-y: auto;
        }
        .hn-prod-row {
          display: grid;
          grid-template-columns: 1fr 150px 44px 48px 56px 96px 44px;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          font-size: 13px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
        }
        .hn-prod-row:last-child { border-bottom: none; }
        .hn-prod-head {
          position: sticky;
          top: 0;
          background: var(--bg);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-muted);
          cursor: default;
        }
        .hn-prod-row:not(.hn-prod-head):hover { background: var(--accent-soft); }
        .hn-prod-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-prod-code { font-weight: 600; font-size: 12px; }
        .hn-prod-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        /* ============== PRICING CALCULATOR ============== */
        .hn-pc-code {
          padding: 2px 8px;
          border-radius: 6px;
          background: var(--accent-soft);
          color: var(--accent);
          font-size: 11px;
          font-weight: 700;
        }
        /* ============== PRODUCT MAINTENANCE VIEW ============== */
        .hn-pmv-ident {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 20px 0;
        }
        .hn-pmv-ident-name { font-size: 15px; font-weight: 700; }
        .hn-pmv-ident-meta { font-size: 11.5px; color: var(--text-muted); white-space: nowrap; }
        .hn-pmv-tabs {
          display: flex;
          gap: 4px;
          padding: 10px 20px 0;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }
        .hn-pmv-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 11px;
          border: none;
          border-bottom: 2px solid transparent;
          background: none;
          font-size: 12.5px;
          font-weight: 600;
          font-family: inherit;
          color: var(--text-muted);
          cursor: pointer;
          white-space: nowrap;
        }
        .hn-pmv-tab:hover { color: var(--text); }
        .hn-pmv-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
        .hn-pmv-tab-num {
          font-size: 9.5px;
          padding: 1px 5px;
          border-radius: 5px;
          background: var(--bg);
          border: 1px solid var(--border);
          color: var(--text-faint);
        }
        .hn-pmv-tab.active .hn-pmv-tab-num { background: var(--accent-soft); border-color: transparent; color: var(--accent); }
        .hn-pmv-body {
          padding: 16px 20px;
          max-height: min(560px, calc(100vh - 300px));
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .hn-pmv-box {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px 14px 14px;
          background: var(--surface);
          margin-bottom: 0;
        }
        .hn-pmv-box + .hn-pmv-box { margin-top: 12px; }
        .hn-pmv-box-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--pmv-accent, var(--text-muted));
          margin-bottom: 10px;
        }
        .hn-pmv-box-title::before {
          content: '';
          width: 3px;
          height: 13px;
          border-radius: 2px;
          background: var(--pmv-accent, var(--accent));
        }
        .hn-pmv-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .hn-pmv-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .hn-pmv-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .hn-pmv-cols2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: start; }
        .hn-pmv-spec { min-width: 0; }
        .hn-pmv-spec-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hn-pmv-spec-value {
          display: block;
          min-height: 30px;
          padding: 5px 9px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          font-size: 12.5px;
          color: var(--text);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hn-pmv-table { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
        .hn-pmv-tr {
          display: grid;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          font-size: 12.5px;
          border-bottom: 1px solid var(--border);
        }
        .hn-pmv-tr:last-child { border-bottom: none; }
        .hn-pmv-th {
          background: var(--bg);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          position: sticky;
          top: 0;
        }
        .hn-pmv-total { background: var(--accent-soft); font-weight: 700; }
        .hn-pmv-disc-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          padding: 10px 12px;
          margin-bottom: 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--bg);
          font-size: 12.5px;
          color: var(--text-muted);
        }
        .hn-pmv-disc-summary b { color: var(--text); font-weight: 700; margin-left: 4px; }
        .hn-pmv-f4 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 12px;
          padding: 7px 12px;
          border: 1px solid var(--accent);
          border-radius: 8px;
          background: var(--surface);
          color: var(--accent);
          font-size: 12px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
        }
        .hn-pmv-f4:hover { background: var(--accent); color: #fff; }
        @media (max-width: 900px) {
          .hn-pmv-cols2 { grid-template-columns: 1fr; }
          .hn-pmv-grid4 { grid-template-columns: 1fr 1fr; }
        }

        .hn-pc-body { padding: 18px 20px 16px; display: flex; flex-direction: column; gap: 14px; }
        .hn-pc-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 5px;
        }
        .hn-pc-label em { font-style: normal; font-weight: 500; text-transform: none; letter-spacing: 0; color: var(--text-faint); }
        .hn-pc-label.accent { color: var(--accent); }
        .hn-pc-in {
          width: 100%;
          height: 34px;
          padding: 0 10px;
          border: 1px solid var(--border-strong);
          border-radius: 8px;
          background: var(--surface);
          font-size: 13.5px;
          color: var(--text);
          text-align: right;
        }
        .hn-pc-in:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .hn-pc-in.accent { border-color: var(--accent); font-weight: 600; }
        .hn-pc-desc { display: flex; flex-direction: column; }
        .hn-pc-desc-in { text-align: left; font-weight: 600; font-size: 14px; height: 38px; }

        .hn-pc-ref {
          display: grid;
          grid-template-columns: repeat(5, 1fr) auto;
          gap: 12px;
          align-items: end;
          padding: 14px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        .hn-pc-ref-cell { min-width: 0; }
        .hn-pc-excl {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 500;
          white-space: nowrap;
          padding-bottom: 8px;
          cursor: pointer;
        }
        .hn-pc-excl input { width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer; }

        .hn-pc-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hn-pc-panel {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 14px 16px;
          background: var(--surface);
        }
        .hn-pc-panel-head {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text);
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        .hn-pc-line { margin-bottom: 12px; }
        .hn-pc-line:last-child { margin-bottom: 0; }
        .hn-pc-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .hn-pc-sub { display: flex; flex-direction: column; }
        .hn-pc-subtag { font-size: 10px; font-weight: 600; color: var(--text-faint); margin-bottom: 3px; letter-spacing: 0.05em; text-transform: uppercase; }
        .hn-pc-out {
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg);
          font-size: 13.5px;
          color: var(--text-muted);
        }
        .hn-pc-out.strong { color: var(--text); font-weight: 700; background: var(--accent-soft); border-color: transparent; }
        .hn-pc-out.neg { color: #DC2626; }

        .hn-pc-result {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          padding: 14px;
          border-radius: 12px;
          background: var(--bg);
          border: 1px solid var(--border);
        }
        .hn-pc-result-cell { display: flex; flex-direction: column; gap: 4px; padding-left: 12px; border-left: 3px solid var(--border-strong); }
        .hn-pc-result-cell.good { border-left-color: #16A34A; }
        .hn-pc-result-cell.warn { border-left-color: #F59E0B; }
        .hn-pc-result-cell.accent { border-left-color: var(--accent); }
        .hn-pc-result-label { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
        .hn-pc-result-val { font-size: 19px; font-weight: 700; color: var(--text); }
        .hn-pc-reset {
          border: none;
          background: none;
          padding: 0;
          color: var(--accent);
          font-size: 12px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          text-decoration: underline;
        }
        @media (max-width: 820px) {
          .hn-pc-cols { grid-template-columns: 1fr; }
          .hn-pc-ref { grid-template-columns: 1fr 1fr; }
          .hn-pc-result { grid-template-columns: 1fr 1fr; }
        }

        .hn-browse-empty {
          padding: 24px 16px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          text-align: center;
        }

        /* Customer search result rows */
        .hn-cust-search-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 11px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
          transition: border-color 0.14s ease, box-shadow 0.14s ease;
        }
        .hn-cust-search-row:hover {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
        }

        .hn-browse-footer {
          padding: 10px 16px;
          background: var(--bg);
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-muted);
        }

        .hn-kbd-inline {
          background: var(--surface);
          border: 1px solid var(--border);
          border-bottom-width: 2px;
          padding: 0px 5px;
          border-radius: 4px;
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.04em;
          display: inline-block;
          line-height: 1.5;
          min-width: 14px;
          text-align: center;
        }
        .hn-kbd-large {
          width: 38px;
          height: 38px;
          background: linear-gradient(180deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Consolas, 'Courier New', monospace;
          font-weight: 700;
          font-size: 18px;
          color: #FFFFFF;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 -2px 0 rgba(0, 0, 0, 0.10),
            0 2px 4px rgba(15, 23, 42, 0.10);
          flex-shrink: 0;
        }

        /* ===== App shell / screens ===== */
        .hn-topbar {
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .hn-topbar-left { display: flex; align-items: center; gap: 16px; }
        .hn-store-sub { font-style: italic; font-size: 12.5px; color: var(--text-muted); margin-top: 2px; }

        /* Segmented pill on the top bar (operator + clock) */
        .hn-pill-group {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          padding: 4px 6px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.05);
        }
        .hn-pill-seg {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 4px 12px;
          font-size: 12.5px;
          color: var(--text);
          border-radius: 999px;
          white-space: nowrap;
        }
        .hn-pill-divider {
          width: 1px;
          height: 18px;
          background: var(--border);
          flex-shrink: 0;
        }
        .hn-pill-group-btn {
          font-family: 'Segoe UI', Arial, sans-serif;
          cursor: pointer;
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-pill-group-btn:hover {
          background: var(--bg);
          box-shadow: 0 4px 12px -6px rgba(15, 23, 42, 0.18);
        }

        /* ===== Sidebar shell ===== */
        .hn-app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(120% 80% at 100% 0%, rgba(37, 99, 235, 0.07), transparent 55%),
            radial-gradient(90% 70% at 0% 100%, rgba(37, 99, 235, 0.05), transparent 50%),
            var(--bg);
        }
        .hn-body { flex: 1; display: flex; align-items: stretch; min-height: 0; }

        .hn-sidebar {
          width: 300px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #2563EB 0%, #1E50C8 55%, #1D4ED8 100%);
          display: flex;
          flex-direction: column;
          padding: 16px 14px 18px;
          gap: 4px;
          border-right: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 1px 0 0 rgba(255, 255, 255, 0.20),
            inset -1px 0 0 rgba(255, 255, 255, 0.05),
            2px 0 18px -10px rgba(15, 23, 42, 0.40);
        }
        .hn-sidebar-nav { display: flex; flex-direction: column; gap: 5px; }

        .hn-side-item {
          display: grid;
          grid-template-columns: 30px 1fr auto;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.11);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.90);
          text-align: left;
          cursor: pointer;
          transition: background-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease, transform 0.12s ease;
        }
        .hn-side-item.has-icon { grid-template-columns: 30px 22px 1fr auto; }
        .hn-side-item:hover {
          background: rgba(255, 255, 255, 0.20);
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.30);
        }
        .hn-side-item:active { transform: translateY(0.5px); }
        .hn-side-item.active {
          background: rgba(255, 255, 255, 0.22);
          color: #fff;
          border-color: rgba(255, 255, 255, 0.34);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.55),
            0 6px 16px -8px rgba(15, 23, 42, 0.45);
        }
        .hn-side-num {
          font-family: Consolas, 'Courier New', monospace;
          font-weight: 700;
          font-size: 15px;
          line-height: 1;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.14);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.30);
        }
        .hn-side-item.active .hn-side-num {
          background: rgba(255, 255, 255, 0.30);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);
        }
        .hn-side-icon { display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.85); }
        .hn-side-item.active .hn-side-icon { color: #fff; }
        .hn-side-label {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          line-height: 1.25;
          min-width: 0;
        }
        .hn-side-chev { color: rgba(255, 255, 255, 0.45); flex-shrink: 0; transition: transform 0.16s ease, color 0.16s ease; }
        .hn-side-item:hover .hn-side-chev { color: rgba(255, 255, 255, 0.85); transform: translateX(2px); }
        .hn-side-item.active .hn-side-chev { color: #fff; }

        .hn-side-back {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 11px 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 13px;
          background: rgba(15, 23, 42, 0.16);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.84);
          text-align: left;
          cursor: pointer;
          transition: background-color 0.16s ease, color 0.16s ease;
        }
        .hn-side-back:hover { background: rgba(15, 23, 42, 0.26); color: #fff; }
        .hn-side-back-key {
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 7px;
          background: rgba(255, 255, 255, 0.18);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.28);
        }

        /* ===== Menu content pane ===== */
        .hn-content-pane { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .hn-content {
          flex: 1;
          position: relative;
          padding: 40px 44px 28px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .hn-content-head { position: relative; z-index: 2; max-width: 560px; }
        .hn-content-title { font-size: 40px; font-weight: 500; letter-spacing: -0.015em; margin: 8px 0 0; line-height: 1.05; }
        .hn-title-rule { display: block; width: 56px; height: 3px; border-radius: 2px; background: var(--accent); margin: 16px 0 18px; }
        .hn-content-sub { font-size: 14.5px; color: var(--text-muted); line-height: 1.55; margin: 0; }
        .hn-strong { font-weight: 600; color: var(--text); }
        .hn-terminal-panel {
          position: relative;
          z-index: 2;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: 0 8px 24px -14px rgba(15, 23, 42, 0.22);
        }
        .hn-terminal-eyebrow { color: var(--text-faint); margin-bottom: 6px; }
        .hn-terminal-line { font-size: 13px; color: var(--text); letter-spacing: 0.02em; }
        .hn-terminal-date {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          color: var(--text-muted);
        }

        .hn-screen {
          flex: 1;
          padding: 36px 32px 48px;
          max-width: 1100px;
          width: 100%;
          margin: 0 auto;
        }
        .hn-screen-title { font-size: 34px; font-weight: 500; letter-spacing: -0.01em; margin: 0; line-height: 1.1; }
        .hn-screen-sub { font-size: 13.5px; color: var(--text-muted); }

        /* ===== Manual Purchase Request ===== */
        .hn-mpr-head {
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 18px;
          align-items: end;
          padding: 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
        }
        .hn-mpr-field { display: flex; flex-direction: column; }
        .hn-mpr-req {
          height: 40px; display: flex; align-items: center; padding: 0 12px;
          border: 1px solid var(--border); border-radius: 10px; background: var(--bg);
          font-size: 15px; font-weight: 700; color: var(--accent);
        }
        .hn-mpr-supwrap { display: flex; align-items: center; gap: 10px; }
        .hn-mpr-supwrap .hn-input { max-width: 220px; }
        .hn-mpr-f4 { font-size: 11px; font-weight: 700; color: var(--accent); white-space: nowrap; }
        .hn-mpr-grid-head, .hn-mpr-grid-row {
          display: grid;
          grid-template-columns: 150px 1fr 60px 70px 100px 110px 34px;
          gap: 10px; align-items: center; padding: 8px 12px;
        }
        .hn-mpr-grid-head { font-size: 10.5px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-mpr-grid-row { font-size: 13px; border-bottom: 1px solid var(--border); }
        .hn-mpr-grid-row:last-child { border-bottom: none; }
        .hn-mpr-qty { width: 100%; height: 30px; text-align: right; padding: 0 8px; border: 1px solid var(--border-strong); border-radius: 7px; background: var(--surface); color: var(--text); font-size: 13px; }
        .hn-mpr-qty:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .hn-mpr-del { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); color: #DC2626; cursor: pointer; }
        .hn-mpr-del:hover { background: rgba(220,38,38,0.08); border-color: #DC2626; }
        .hn-mpr-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 14px; flex-wrap: wrap; }
        .hn-mpr-fkeys { display: flex; flex-wrap: wrap; gap: 6px; }
        .hn-mpr-fkey { padding: 5px 9px; border: 1px solid var(--border); border-radius: 7px; background: var(--surface); font-size: 11px; color: var(--text-muted); }
        .hn-mpr-subtotal {
          display: flex; align-items: center; gap: 14px; padding: 10px 18px;
          border-radius: 10px; background: linear-gradient(180deg, #DC2626, #B91C1C); color: #fff;
          font-size: 13px; font-weight: 700;
        }
        .hn-mpr-subtotal span:last-child { font-size: 17px; }
        .hn-mpr-status { margin-top: 14px; font-size: 11px; color: var(--text-faint); display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

        /* ===== Purchase Request and Approvals ===== */
        .hn-pra-top { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
        .hn-pra-summary { display: flex; gap: 10px; }
        .hn-pra-sum-cell {
          display: flex; flex-direction: column; gap: 2px; padding: 8px 16px 8px 12px;
          border-radius: 10px; background: var(--surface); border: 1px solid var(--border); border-left-width: 3px;
        }
        .hn-pra-sum-cell span:first-child { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
        .hn-pra-sum-cell span:nth-child(2) { font-size: 16px; font-weight: 700; }
        .hn-pra-sum-cell span:last-child { font-size: 12px; color: var(--text-muted); }
        .hn-pra-sum-cell.pending { border-left-color: #D97706; }
        .hn-pra-sum-cell.approved { border-left-color: #16A34A; }
        .hn-pra-sum-cell.declined { border-left-color: #DC2626; }
        .hn-pra-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .hn-pra-search { display: flex; align-items: center; gap: 8px; padding: 0 10px; height: 34px; border: 1px solid var(--border-strong); border-radius: 9px; background: var(--surface); }
        .hn-pra-btn {
          height: 34px; padding: 0 14px; border: 1px solid var(--border); border-radius: 9px;
          background: var(--surface); color: var(--text-muted); font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer;
          transition: background-color 0.13s ease, color 0.13s ease, border-color 0.13s ease;
        }
        .hn-pra-btn:hover { border-color: var(--accent); color: var(--accent); }
        .hn-pra-btn.approve { border-color: #16A34A; color: #16A34A; }
        .hn-pra-btn.approve:hover { background: #16A34A; color: #fff; }
        .hn-pra-btn.decline { border-color: #DC2626; color: #DC2626; }
        .hn-pra-btn.decline:hover { background: #DC2626; color: #fff; }
        .hn-pra-btn.generate { background: var(--accent); border-color: var(--accent); color: #fff; }
        .hn-pra-btn.generate:hover { background: #1D4ED8; }
        .hn-pra-layout { display: grid; grid-template-columns: minmax(0, 1fr) 380px; gap: 16px; align-items: start; }
        .hn-pra-grid-wrap { overflow-x: auto; }
        .hn-pra-grid-head, .hn-pra-grid-row {
          display: grid;
          grid-template-columns: 96px 78px 48px 108px minmax(180px, 1fr) 44px 84px 88px 44px 84px;
          gap: 8px; align-items: center; padding: 8px 10px; min-width: 900px;
        }
        .hn-pra-grid-head { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-pra-grid-row { font-size: 12.5px; border-bottom: 1px solid var(--border); cursor: pointer; }
        .hn-pra-grid-row:hover { background: var(--accent-soft); }
        .hn-pra-grid-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-pra-pill { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; }
        .hn-pra-pill.pending { background: rgba(217,119,6,0.14); color: #B45309; }
        .hn-pra-pill.approved { background: rgba(22,163,74,0.14); color: #15803D; }
        .hn-pra-pill.declined { background: rgba(220,38,38,0.14); color: #B91C1C; }
        .hn-pra-ledger-head, .hn-pra-ledger-row { display: grid; grid-template-columns: 90px 70px 90px 70px 90px 90px; gap: 8px; padding: 6px 10px; font-size: 12px; }
        .hn-pra-ledger-head { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-pra-ledger-row { border-bottom: 1px solid var(--border); }
        .hn-pra-ledger-row:last-child { border-bottom: none; }
        .hn-pra-detail { border: 1px solid var(--border); border-radius: 14px; background: var(--surface); padding: 14px; position: sticky; top: 12px; }
        .hn-pra-supbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px solid var(--border); }
        .hn-pra-supno { font-size: 13px; font-weight: 700; color: var(--accent); }
        .hn-pra-supname { font-size: 13.5px; font-weight: 700; margin-top: 2px; }
        .hn-pra-supfrom { font-size: 11px; color: var(--text-faint); margin-top: 2px; }
        .hn-pra-minorder { display: flex; flex-direction: column; align-items: flex-end; padding: 6px 10px; border-radius: 9px; background: var(--bg); }
        .hn-pra-minorder span:first-child { font-size: 9.5px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
        .hn-pra-minorder span:last-child { font-size: 15px; font-weight: 700; }
        .hn-pra-detrow { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px; }
        .hn-pra-sec { font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--pmv-accent, var(--accent)); margin: 10px 0 8px; padding-top: 8px; border-top: 1px solid var(--border); }

        /* ===== Rebuild options ===== */
        .hn-rb-card { max-width: 640px; padding: 20px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); display: flex; flex-direction: column; gap: 16px; }
        .hn-rb-field { display: flex; flex-direction: column; }
        .hn-rb-fixed { height: 40px; display: flex; align-items: center; padding: 0 12px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); font-size: 14px; font-weight: 600; max-width: 220px; }
        .hn-rb-card .hn-input { max-width: 260px; }
        .hn-rb-foot { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding-top: 6px; border-top: 1px solid var(--border); }
        .hn-rb-saved { font-size: 13px; font-weight: 600; color: #16A34A; }
        @media (max-width: 1100px) {
          .hn-pra-layout { grid-template-columns: 1fr; }
          .hn-pra-detail { position: static; }
        }

        /* ===== Cash Sale ===== */
        .hn-cs-saleno {
          padding: 8px 16px; border: 2px solid var(--accent); border-radius: 10px;
          background: var(--accent-soft); color: var(--accent); font-size: 18px; font-weight: 700;
        }
        .hn-cs-layout { display: grid; grid-template-columns: minmax(0, 1fr) 420px; gap: 18px; align-items: start; }
        .hn-cs-form { display: flex; flex-direction: column; gap: 12px; padding: 18px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; }
        .hn-cs-field { display: flex; flex-direction: column; }
        .hn-cs-f4 { border: none; background: none; font-size: 11px; font-weight: 700; color: var(--accent); white-space: nowrap; cursor: pointer; padding: 4px; }
        .hn-cs-f4:hover { text-decoration: underline; }
        .hn-cs-fkeys { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; padding-top: 14px; border-top: 1px solid var(--border); }
        .hn-cs-tape {
          border-radius: 14px; overflow: hidden; border: 1px solid var(--border);
          background: #12245F; color: #DCE6FF; display: flex; flex-direction: column; min-height: 460px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .hn-app[data-theme="dark"] .hn-cs-tape { background: #0E1B49; }
        .hn-cs-tape-head { padding: 14px 16px; font-size: 12px; line-height: 1.5; border-bottom: 1px solid rgba(255,255,255,0.12); }
        .hn-cs-tape-rule { height: 0; border-top: 1px dashed rgba(255,255,255,0.28); margin: 8px 0; }
        .hn-cs-tape-body { flex: 1; overflow-y: auto; padding: 12px 16px; font-size: 12px; line-height: 1.5; }
        .hn-cs-tape-empty { color: rgba(220,230,255,0.55); text-align: center; padding: 40px 0; }
        .hn-cs-tape-name { font-weight: 700; color: #FFFFFF; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px; }
        .hn-cs-void { border: none; background: rgba(255,255,255,0.12); color: #FFD1D1; width: 20px; height: 20px; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        .hn-cs-void:hover { background: #DC2626; color: #fff; }
        .hn-cs-tape-kv { display: flex; justify-content: space-between; gap: 12px; padding-left: 12px; }
        .hn-cs-tape-warr { margin: 6px 0 6px 12px; color: rgba(220,230,255,0.85); font-size: 11.5px; line-height: 1.45; }
        .hn-cs-tape-total {
          display: flex; justify-content: space-between; align-items: center; gap: 14px;
          padding: 12px 18px; background: linear-gradient(180deg, #DC2626, #B91C1C); color: #fff; font-weight: 700; font-size: 14px;
        }
        .hn-cs-tape-total span:last-child { font-size: 18px; }

        /* ===== Barcode Label Printing ===== */
        .hn-bl-form { display: flex; gap: 14px; flex-wrap: wrap; align-items: flex-start; padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; }
        .hn-bl-grid-head, .hn-bl-grid-row { display: grid; grid-template-columns: 150px 1fr 90px 160px 60px 34px; gap: 10px; align-items: center; padding: 8px 12px; }
        .hn-bl-grid-head { font-size: 10.5px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-bl-grid-row { font-size: 13px; border-bottom: 1px solid var(--border); }
        .hn-bl-grid-row:last-child { border-bottom: none; }

        /* ===== Insurance / EDI shared empty-list styling ===== */
        .hn-ins-searchbar, .hn-edi-searchbar { display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap; padding: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; }
        .hn-ins-grid-head, .hn-edi-grid-head, .hn-ediprod-grid-head {
          display: grid; gap: 8px; padding: 9px 12px; background: var(--header-dark); color: #fff;
          font-size: 10.5px; font-weight: 600; letter-spacing: 0.03em; border-radius: 8px 8px 0 0; overflow-x: auto;
        }
        .hn-ins-grid-head { grid-template-columns: repeat(11, minmax(90px, 1fr)); }
        .hn-edi-grid-head { grid-template-columns: 50px repeat(11, minmax(80px, 1fr)); }
        .hn-ediprod-grid-head { grid-template-columns: repeat(8, minmax(80px, 1fr)); }
        .hn-ins-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px; text-align: center; padding: 30px; }
        .hn-edi-check { display: flex; align-items: center; gap: 8px; align-self: flex-end; font-size: 13px; font-weight: 500; color: var(--text-muted); cursor: pointer; }
        .hn-edi-check input { width: 16px; height: 16px; accent-color: var(--accent); }

        /* ===== Product Care Orders ===== */
        .hn-pco-searchbar { display: flex; flex-direction: column; gap: 12px; padding: 14px 16px; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; }
        .hn-pco-search { display: flex; align-items: center; gap: 8px; padding: 0 10px; height: 36px; border: 1px solid var(--border-strong); border-radius: 9px; background: var(--bg); max-width: 460px; }
        .hn-pco-filters { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .hn-pco-fchip { display: inline-flex; align-items: center; padding: 5px 11px; border-radius: 999px; background: var(--bg); border: 1px solid var(--border); font-size: 12px; color: var(--text-muted); }
        .hn-pco-fchip strong { color: var(--text); margin-left: 3px; }
        .hn-pco-select { border: none; background: none; font: inherit; font-weight: 700; color: var(--accent); cursor: pointer; }
        .hn-pco-layout { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 16px; align-items: start; margin-top: 16px; }
        .hn-pco-grid-wrap { overflow-x: auto; }
        .hn-pco-grid-head, .hn-pco-grid-row {
          display: grid; grid-template-columns: 60px 150px 140px 90px 74px 96px 116px 96px 110px 84px;
          gap: 8px; align-items: center; padding: 7px 10px; min-width: 1000px;
        }
        .hn-pco-grid-head { font-size: 10px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-pco-grid-row { font-size: 12px; border-bottom: 1px solid var(--border); cursor: pointer; }
        .hn-pco-grid-row:hover { background: var(--accent-soft); }
        .hn-pco-grid-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-pco-status { display: inline-block; padding: 1px 7px; border-radius: 999px; background: rgba(22,163,74,0.15); color: #15803D; font-size: 10px; font-weight: 700; }
        .hn-pco-items-head, .hn-pco-items-row { display: grid; grid-template-columns: 160px 1fr 70px 100px 60px; gap: 10px; padding: 7px 10px; font-size: 12.5px; }
        .hn-pco-items-head { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-pco-items-row { background: rgba(234,179,8,0.06); border-radius: 6px; }
        .hn-pco-bottom { display: grid; grid-template-columns: 240px 1fr; gap: 14px; margin-top: 14px; }
        .hn-pco-sec { font-size: 10.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .hn-pco-inv-row { display: flex; justify-content: space-between; gap: 10px; padding: 4px 0; font-size: 12.5px; border-bottom: 1px dashed var(--border); }
        .hn-pco-note-box { min-height: 44px; padding: 8px 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--bg); font-size: 12.5px; color: var(--text-muted); }
        .hn-pco-detail { border: 1px solid var(--border); border-radius: 14px; background: var(--surface); padding: 14px; position: sticky; top: 12px; }
        .hn-pco-invcust { font-size: 13.5px; font-weight: 700; }
        .hn-pco-matched { font-size: 11px; color: var(--text-faint); margin-top: 3px; }
        .hn-pco-two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
        .hn-pco-addr { font-size: 12px; line-height: 1.5; color: var(--text-muted); }
        .hn-pco-email { font-size: 10.5px; color: var(--text-faint); word-break: break-all; margin-top: 2px; }
        .hn-pco-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); }
        @media (max-width: 1150px) {
          .hn-cs-layout, .hn-pco-layout { grid-template-columns: 1fr; }
          .hn-pco-detail { position: static; }
          .hn-pco-bottom { grid-template-columns: 1fr; }
        }
        .hn-screen-footer {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--text-faint);
          font-family: Consolas, 'Courier New', monospace;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          flex-wrap: wrap;
          gap: 8px;
        }

        .hn-field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 7px;
          letter-spacing: 0.02em;
        }
        .hn-field-hint { display: block; margin-top: 7px; font-size: 11.5px; color: var(--text-faint); }

        .hn-detail-grid {
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 18px;
        }
        .hn-detail {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 11px 14px;
          border-bottom: 1px solid var(--border);
        }
        .hn-detail:last-child { border-bottom: none; }
        .hn-detail-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .hn-detail-value { font-size: 13.5px; color: var(--text); text-align: right; }

        .hn-confirm-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: var(--accent-soft);
          border: 1px solid var(--accent);
          border-radius: 8px;
        }
        .hn-confirm-input {
          width: 44px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          padding: 8px 0;
          border: 1px solid var(--accent);
          border-radius: 6px;
          background: var(--surface);
          color: var(--accent);
          outline: none;
          text-transform: uppercase;
        }
        .hn-confirm-hint { font-family: Consolas, 'Courier New', monospace; font-size: 11px; color: var(--text-muted); margin-left: auto; }

        .hn-result-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          cursor: pointer;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          width: 100%;
        }
        .hn-result-row:hover { border-color: var(--text); box-shadow: 0 4px 12px -4px rgba(15,23,42,0.10); }
        .hn-result-row.active { border-color: var(--accent); background: var(--accent-soft); }

        .hn-invoice-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .hn-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 20px;
          position: relative;
          overflow: hidden;
        }
        /* Colored accent strip + tint for the customer panel */
        .hn-panel-customer {
          background: linear-gradient(180deg, rgba(37,99,235,0.05), rgba(37,99,235,0.01));
          border-color: rgba(37,99,235,0.18);
        }
        .hn-panel-customer::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #60A5FA, #2563EB);
        }
        /* Warm tint for the notes panel */
        .hn-panel-notes {
          background: linear-gradient(180deg, rgba(202,138,4,0.06), rgba(202,138,4,0.01));
          border-color: rgba(202,138,4,0.20);
        }
        .hn-panel-notes::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #FBBF24, #D97706);
        }
        .hn-panel-title {
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }
        .hn-panel-notes .hn-panel-title { color: #B45309; }
        .hn-cust-name { font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 500; line-height: 1.1; margin-bottom: 14px; color: var(--text); }
        .hn-cust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
        .hn-cust-grid > div { display: flex; flex-direction: column; gap: 3px; }
        .hn-notes-preview { font-size: 13px; line-height: 1.5; color: var(--text); white-space: pre-wrap; min-height: 60px; }

        .hn-product-search {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 18px;
          background: linear-gradient(180deg, rgba(37,99,235,0.07), rgba(37,99,235,0.02));
          border: 1px solid rgba(37,99,235,0.22);
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
          margin-bottom: 16px;
        }
        .hn-product-search:hover { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); background: linear-gradient(180deg, rgba(37,99,235,0.11), rgba(37,99,235,0.04)); }
        .hn-f4-badge {
          margin-left: auto;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          background: var(--accent);
          padding: 4px 10px;
          border-radius: 5px;
          letter-spacing: 0.04em;
        }
        .hn-items {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 8px;
          margin-bottom: 16px;
        }
        .hn-items-empty { padding: 40px 20px; text-align: center; border: 1px dashed rgba(37,99,235,0.25); border-radius: 8px; background: rgba(37,99,235,0.02); }
        /* Totals bar — colored gradient so it reads as the summary footer */
        .hn-totals {
          display: flex;
          justify-content: flex-end;
          gap: 28px;
          padding: 18px 22px;
          background: linear-gradient(180deg, #1E3A8A, #1E40AF);
          border: 1px solid #1E40AF;
          border-radius: 12px;
          box-shadow: 0 8px 24px -12px rgba(30,58,138,0.5);
        }
        .hn-totals .hn-detail-label { color: rgba(255,255,255,0.6); }
        .hn-total-item { display: flex; flex-direction: column; gap: 4px; align-items: flex-end; }
        .hn-total-value { font-size: 18px; font-weight: 600; color: #fff; }
        .hn-total-grand .hn-total-value { color: #60A5FA; font-size: 24px; }
        .hn-totals-divider { width: 1px; background: rgba(255,255,255,0.18); align-self: stretch; flex-shrink: 0; }

        .hn-notes-area {
          width: 100%;
          min-height: 140px;
          resize: vertical;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px 14px;
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-notes-area:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }

        /* New Invoice — colored function-key toolbar */
        .hn-inv-fnbar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }
        .hn-inv-fnbtn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.14s ease, background-color 0.14s ease, box-shadow 0.14s ease, transform 0.1s ease;
        }
        .hn-inv-fnbtn:hover { border-color: var(--accent); background: var(--accent-soft); box-shadow: 0 3px 10px -5px rgba(37,99,235,0.4); }
        .hn-inv-fnbtn:active { transform: translateY(0.5px); }
        .hn-inv-fnkey {
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #fff;
          background: var(--accent);
          padding: 2px 7px;
          border-radius: 5px;
          white-space: nowrap;
        }
        .hn-inv-fnbtn:hover .hn-inv-fnkey { background: #1D4ED8; }

        /* ===== Product Groups dialog (Alt + G) ===== */
        /* Three-column accordion: department | section | category.
           Each column scrolls independently so long lists don't blow out
           the dialog height. */
        .hn-pg-layout {
          display: grid;
          grid-template-columns: 220px 220px 1fr;
          min-height: 360px;
          max-height: 520px;
        }
        .hn-pg-col {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          border-right: 1px solid var(--border);
        }
        .hn-pg-col:last-child { border-right: none; }
        .hn-pg-col-sect,
        .hn-pg-col-cat {
          /* Subtle inset to read as a "drilled into" level */
          background: var(--bg);
        }
        .hn-pg-col-head {
          position: sticky;
          top: 0;
          z-index: 2;
          background: var(--header-dark);
          color: #fff;
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .hn-pg-empty-col {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: var(--text-faint);
          padding: 24px;
          text-align: center;
          font-style: italic;
        }

        /* Department rows */
        .hn-pg-row {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 14px;
          border: none;
          border-bottom: 1px solid var(--border);
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.13s ease, color 0.13s ease;
          color: var(--text);
        }
        .hn-pg-row:last-child { border-bottom: none; }
        .hn-pg-row:hover { background: var(--accent-soft); color: var(--accent); }
        .hn-pg-row.active {
          background: var(--accent);
          color: #fff;
        }
        .hn-pg-row.leaf { cursor: default; }
        .hn-pg-row.leaf:hover { background: var(--bg); color: var(--text-muted); }

        .hn-pg-num {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: var(--border);
          color: var(--text);
          font-family: Consolas, 'Courier New', monospace;
          font-size: 12px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background-color 0.13s ease, color 0.13s ease;
        }
        .hn-pg-dept-row.active .hn-pg-num {
          background: rgba(255,255,255,0.22);
          color: #fff;
        }
        .hn-pg-dept-row:hover:not(.active) .hn-pg-num {
          background: var(--accent-soft);
          color: var(--accent);
        }

        .hn-pg-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-faint);
          flex-shrink: 0;
          transition: background-color 0.13s ease;
        }
        .hn-pg-sect-row.active .hn-pg-dot { background: rgba(255,255,255,0.7); }
        .hn-pg-sect-row:hover:not(.active) .hn-pg-dot { background: var(--accent); }

        .hn-pg-cat-dash {
          font-size: 13px;
          color: var(--text-faint);
          flex-shrink: 0;
          user-select: none;
        }

        .hn-pg-label {
          font-size: 13px;
          font-weight: 500;
          flex: 1;
          min-width: 0;
          line-height: 1.3;
        }

        .hn-pg-chev {
          flex-shrink: 0;
          color: var(--text-faint);
          transition: transform 0.18s ease, color 0.13s ease;
        }
        .hn-pg-chev.open { transform: rotate(90deg); }
        .hn-pg-row.active .hn-pg-chev { color: rgba(255,255,255,0.7); }
        .hn-pg-row:hover:not(.active) .hn-pg-chev { color: var(--accent); }

        /* ===== Online Orders + Undelivered Sales — shared wide screen ===== */
        .hn-screen-wide { max-width: 1500px; }

        /* Shared card shell used across both screens */
        .hn-oo-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
        }
        .hn-oo-card-head {
          background: var(--header-dark);
          color: #fff;
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 14px;
        }

        /* Shared status badges */
        .hn-oo-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }
        .hn-oo-badge.completed { background: rgba(21,128,61,0.1); color: var(--success); }
        .hn-oo-badge.pending   { background: rgba(217,119,6,0.1); color: #B45309; }
        .hn-oo-badge.new       { background: var(--accent-soft); color: var(--accent); }
        .hn-oo-dispatch {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          padding: 2px 9px;
          border-radius: 6px;
        }
        .hn-oo-dispatch.delivery { background: var(--accent-soft); color: var(--accent); }
        .hn-oo-dispatch.pickup   { background: var(--bg); color: var(--text-muted); border: 1px solid var(--border); }

        /* ===== Online Orders ===== */
        .hn-oo-summary {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 18px;
        }
        .hn-oo-summary-value { font-size: 22px; font-weight: 600; color: var(--accent); }

        .hn-oo-filterbar {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .hn-oo-search {
          flex: 1;
          min-width: 240px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-oo-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-oo-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-size: 13.5px; color: var(--text);
        }
        .hn-oo-search-input::placeholder { color: var(--text-faint); font-family: 'Segoe UI', Arial, sans-serif; }
        .hn-oo-segmented {
          display: inline-flex;
          padding: 3px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 10px;
          gap: 2px;
        }
        .hn-oo-seg {
          padding: 7px 16px;
          border: none;
          background: transparent;
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          transition: background-color 0.14s ease, color 0.14s ease;
        }
        .hn-oo-seg:hover:not(.active) { color: var(--text); }
        .hn-oo-seg.active { background: var(--surface); color: var(--accent); box-shadow: 0 1px 2px rgba(15,23,42,0.08); }

        .hn-oo-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          gap: 16px;
          align-items: start;
        }

        /* Orders list (left) */
        .hn-oo-list {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 620px;
        }
        .hn-oo-list-head,
        .hn-oo-row {
          display: grid;
          grid-template-columns: 92px 110px 78px 72px 1fr 84px;
          gap: 8px;
          align-items: center;
          padding: 9px 14px;
        }
        .hn-oo-list-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, 'Courier New', monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-faint);
          position: sticky;
          top: 0;
          z-index: 1;
        }
        .hn-oo-col-total { text-align: right; }
        .hn-oo-list-body { overflow-y: auto; }
        .hn-oo-row {
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--border);
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-size: 12.5px;
          color: var(--text);
          transition: background-color 0.12s ease;
        }
        .hn-oo-row:last-child { border-bottom: none; }
        .hn-oo-row:hover { background: var(--bg); }
        .hn-oo-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-oo-col-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .hn-oo-empty { padding: 32px 16px; text-align: center; font-size: 13px; color: var(--text-muted); }

        /* Detail pane (right) */
        .hn-oo-detail {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 620px;
          overflow-y: auto;
          padding-right: 2px;
        }
        .hn-oo-detail-empty {
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: 12px;
          padding: 40px 24px;
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
        }
        .hn-oo-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 18px;
          padding: 16px;
        }
        .hn-oo-info-grid > div { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .hn-oo-info-val { font-size: 13px; color: var(--text); word-break: break-word; }
        .hn-oo-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hn-oo-stack { display: flex; flex-direction: column; gap: 4px; padding: 14px 16px; }
        .hn-oo-name { font-family: Georgia, 'Times New Roman', serif; font-size: 16px; font-weight: 500; }
        .hn-oo-notes {
          padding: 14px 16px;
          font-size: 13px;
          line-height: 1.5;
          color: var(--text);
          white-space: pre-wrap;
        }
        .hn-oo-progress { padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; }
        .hn-oo-progress-row { display: flex; flex-direction: column; gap: 2px; padding-left: 12px; border-left: 2px solid var(--accent-soft); }
        .hn-oo-progress-when { font-size: 10.5px; color: var(--text-faint); }
        .hn-oo-progress-text { font-size: 12.5px; color: var(--text); }
        .hn-oo-ledger { display: flex; flex-direction: column; padding: 8px 16px; }
        .hn-oo-ledger > div { display: flex; justify-content: space-between; gap: 16px; padding: 6px 0; font-size: 12.5px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-oo-ledger > div:last-child { border-bottom: none; }
        .hn-oo-ledger > div span:last-child { color: var(--text); }
        .hn-oo-ledger-strong { font-weight: 600; }
        .hn-oo-ledger-strong span { color: var(--text) !important; }
        .hn-oo-dims { padding: 8px 16px 14px; font-size: 11px; color: var(--text-faint); }
        .hn-oo-items { padding: 8px 0; }
        .hn-oo-items-head, .hn-oo-items-row {
          display: grid;
          grid-template-columns: 110px 1fr 48px 70px 70px 90px;
          gap: 10px;
          align-items: center;
          padding: 8px 16px;
          font-size: 12px;
        }
        .hn-oo-items-head {
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--text-faint);
          border-bottom: 1px solid var(--border);
        }
        .hn-oo-items-row { border-bottom: 1px solid var(--border); color: var(--text); }
        .hn-oo-items-row:last-child { border-bottom: none; }

        /* ===== Undelivered Sales ===== */
        .hn-us-toolbar { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
        .hn-us-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          max-width: 420px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-us-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-us-search-input { flex: 1; background: transparent; border: none; outline: none; font-size: 13.5px; color: var(--text); }
        .hn-us-search-input::placeholder { color: var(--text-faint); font-family: 'Segoe UI', Arial, sans-serif; }
        .hn-us-actions { display: flex; flex-wrap: wrap; gap: 8px; }
        .hn-us-action-btn {
          padding: 9px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.14s ease, background-color 0.14s ease, color 0.14s ease;
        }
        .hn-us-action-btn:hover { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }

        .hn-us-layout { display: grid; grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr); gap: 16px; align-items: start; }
        .hn-us-main { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        .hn-us-side { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        .hn-us-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }

        .hn-us-invoices { display: flex; flex-direction: column; max-height: 320px; }
        .hn-us-inv-head, .hn-us-inv-row {
          display: grid;
          grid-template-columns: 110px 80px minmax(0, 1.3fr) 100px 120px 80px 80px;
          gap: 8px;
          align-items: center;
          padding: 8px 14px;
        }
        .hn-us-inv-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--text-faint);
          position: sticky; top: 0; z-index: 1;
        }
        .hn-us-inv-body { overflow-y: auto; }
        .hn-us-inv-row {
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--border);
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-size: 12px;
          color: var(--text);
          transition: background-color 0.12s ease;
        }
        .hn-us-inv-row:last-child { border-bottom: none; }
        .hn-us-inv-row:hover { background: var(--bg); }
        .hn-us-inv-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-us-ellip { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }

        .hn-us-products { display: flex; flex-direction: column; max-height: 300px; }
        .hn-us-prod-head, .hn-us-prod-row {
          display: grid;
          grid-template-columns: 44px 50px 130px minmax(0, 1fr) 44px 50px 50px 50px 88px 80px;
          gap: 8px;
          align-items: center;
          padding: 8px 14px;
        }
        .hn-us-prod-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--text-faint);
          position: sticky; top: 0;
        }
        .hn-us-prod-body { overflow-y: auto; }
        .hn-us-prod-row { border-bottom: 1px solid var(--border); font-size: 11.5px; color: var(--text); }
        .hn-us-prod-row:last-child { border-bottom: none; }
        .hn-us-type { font-size: 10.5px; font-weight: 600; color: var(--text-muted); background: var(--bg); border: 1px solid var(--border); padding: 1px 7px; border-radius: 5px; }

        .hn-us-initials {
          display: inline-block;
          font-weight: 700;
          color: var(--accent);
          background: var(--accent-soft);
          padding: 0 5px;
          border-radius: 4px;
          margin-right: 4px;
        }
        .hn-us-actions-card .hn-oo-card-head { background: var(--accent); }
        .hn-us-action-list { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; font-size: 12.5px; color: var(--text); }
        .hn-us-action-strong { font-weight: 600; color: #B45309; }
        .hn-us-action-steps { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; line-height: 1.45; }

        @media (max-width: 1100px) {
          .hn-oo-layout, .hn-us-layout { grid-template-columns: 1fr; }
          .hn-oo-detail { max-height: none; }
        }
        @media (max-width: 720px) {
          .hn-oo-two-col { grid-template-columns: 1fr; }
          .hn-oo-info-grid { grid-template-columns: 1fr; }
          .hn-oo-list-head, .hn-oo-items-head, .hn-us-inv-head, .hn-us-prod-head { display: none; }
          .hn-oo-row, .hn-oo-items-row, .hn-us-inv-row, .hn-us-prod-row {
            grid-template-columns: 1fr 1fr;
            gap: 4px 10px;
          }
        }

        /* ===== Customer Service Tickets ===== */
        .hn-cst-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .hn-cst-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          min-width: 280px;
          flex: 0 1 360px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-cst-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-cst-search-input { flex: 1; background: transparent; border: none; outline: none; font-size: 13.5px; color: var(--text); }
        .hn-cst-search-input::placeholder { color: var(--text-faint); font-family: 'Segoe UI', Arial, sans-serif; }
        .hn-cst-checkbox { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--text-muted); cursor: pointer; }
        .hn-cst-checkbox input { width: 15px; height: 15px; accent-color: var(--accent); cursor: pointer; }
        .hn-cst-add-btn { width: auto !important; padding: 10px 18px !important; }

        .hn-cst-layout { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: 16px; align-items: start; }

        /* Ticket list (left) */
        .hn-cst-list { display: flex; flex-direction: column; gap: 10px; max-height: 720px; overflow-y: auto; padding-right: 2px; }
        .hn-cst-card {
          display: grid;
          grid-template-columns: 100px minmax(0, 1.4fr) minmax(0, 1.3fr) minmax(0, 0.9fr);
          gap: 14px;
          align-items: start;
          width: 100%;
          text-align: left;
          padding: 14px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-left: 3px solid var(--border);
          border-radius: 10px;
          cursor: pointer;
          transition: border-color 0.14s ease, box-shadow 0.14s ease, background-color 0.14s ease;
        }
        .hn-cst-card:hover { box-shadow: 0 4px 14px -6px rgba(15,23,42,0.14); }
        .hn-cst-card.active { border-color: var(--accent); border-left-color: var(--accent); background: var(--accent-soft); }
        .hn-cst-card-left { display: flex; flex-direction: column; gap: 8px; }
        .hn-cst-state {
          display: inline-block;
          text-align: center;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 4px 8px;
          border-radius: 6px;
          color: #fff;
          white-space: nowrap;
        }
        .hn-cst-state.critical   { background: #DC2626; }
        .hn-cst-state.inprogress { background: #D97706; }
        .hn-cst-state.followup   { background: #CA8A04; }
        .hn-cst-state.default    { background: var(--text-muted); }
        .hn-cst-ticketno { display: flex; flex-direction: column; gap: 1px; }
        .hn-cst-ticketno-label { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-faint); }
        .hn-cst-ticketno .hn-mono { font-size: 14px; font-weight: 700; color: var(--text); }
        .hn-cst-card-mid { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .hn-cst-subject { font-size: 13.5px; font-weight: 600; color: var(--text); line-height: 1.25; }
        .hn-cst-source { font-size: 12px; color: var(--text-muted); }
        .hn-cst-raised, .hn-cst-lastcontact { font-size: 10.5px; color: var(--text-faint); }
        .hn-cst-card-meta { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .hn-cst-inv { font-size: 11.5px; color: var(--text); font-weight: 600; }
        .hn-cst-trn { color: var(--text-faint); font-weight: 400; }
        .hn-cst-prod { font-size: 11.5px; color: var(--text-muted); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .hn-cst-age { font-size: 10.5px; color: var(--text-faint); }
        .hn-cst-card-flags { display: flex; flex-direction: column; gap: 5px; align-items: flex-start; }
        .hn-cst-flag { font-size: 11px; font-weight: 500; white-space: nowrap; }
        .hn-cst-flag.priority { color: #CA8A04; }
        .hn-cst-flag.faulty { color: #DC2626; }
        .hn-cst-flag.status { color: var(--accent); }
        .hn-cst-assigned { font-size: 10.5px; color: var(--text-faint); margin-top: 2px; }

        /* Ticket detail (right) */
        .hn-cst-detail { display: flex; flex-direction: column; gap: 14px; max-height: 720px; overflow-y: auto; padding-right: 2px; }
        .hn-cst-detail-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: var(--accent);
          color: #fff;
        }
        .hn-cst-detail-ticketlabel { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.85; margin-right: 10px; }
        .hn-cst-detail-ticketno { font-size: 26px; font-weight: 600; }
        .hn-cst-detail-subject { display: flex; flex-direction: column; gap: 12px; padding: 16px; }
        .hn-cst-detail-subject > div { display: flex; flex-direction: column; gap: 4px; }
        .hn-cst-subject-val { font-size: 15px; font-weight: 600; color: var(--text); }
        .hn-cst-desc-val { font-size: 13px; color: var(--text); white-space: pre-line; line-height: 1.5; }
        .hn-cst-cust { padding: 14px 16px; }
        .hn-cst-cust-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px; }
        .hn-cst-details-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px 16px; padding: 16px; }
        .hn-cst-details-grid > div { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .hn-cst-dv { font-size: 13px; color: var(--text); }
        .hn-cst-prod-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--header-dark);
          color: #fff;
          font-family: Consolas, 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 14px;
        }
        .hn-cst-link { background: transparent; border: none; color: #93C5FD; font-size: 11px; font-weight: 600; cursor: pointer; text-decoration: underline; text-transform: none; letter-spacing: 0; }
        .hn-cst-prod-body { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 14px 16px; }
        .hn-cst-prod-col { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
        .hn-cst-prodline { font-size: 12px; color: var(--text-muted); line-height: 1.4; }
        .hn-cst-prodline .hn-mono { color: var(--text); }
        .hn-cst-history { padding: 12px 16px; display: flex; flex-direction: column; gap: 4px; max-height: 280px; overflow-y: auto; background: var(--bg); }
        .hn-cst-history-row { font-size: 11px; color: var(--text-muted); line-height: 1.5; padding: 2px 0; border-bottom: 1px solid var(--border); }
        .hn-cst-history-row:last-child { border-bottom: none; }

        /* New Ticket dialog */
        .hn-nt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; }
        .hn-nt-field { display: flex; flex-direction: column; gap: 5px; }
        .hn-nt-label { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
        .hn-nt-input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 9px 11px;
          font-size: 13.5px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-nt-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-nt-textarea {
          width: 100%;
          min-height: 80px;
          resize: vertical;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 7px;
          padding: 9px 11px;
          font-size: 13.5px;
          font-family: 'Segoe UI', Arial, sans-serif;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-nt-textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-nt-divider { height: 1px; background: var(--border); margin: 16px 0; }
        .hn-nt-alt { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: var(--text-muted); white-space: nowrap; }
        .hn-nt-alt input { width: 14px; height: 14px; accent-color: var(--accent); }
        .hn-nt-actions { display: flex; gap: 10px; margin-top: 18px; }

        /* Open Ticket dialog */
        .hn-ot-dialog {
          pointer-events: auto;
          width: min(1280px, calc(100vw - 40px));
          height: min(860px, calc(100vh - 40px));
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 1px 0 rgba(255,255,255,1) inset, 0 14px 28px -10px rgba(15,23,42,0.34);
        }
        .hn-ot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: var(--header-dark);
          color: #fff;
          flex-shrink: 0;
        }
        .hn-ot-ticketlabel { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }
        .hn-ot-ticketno { font-size: 18px; font-weight: 700; }
        .hn-ot-customer { font-size: 16px; opacity: 0.92; }
        .hn-ot-body { flex: 1; display: grid; grid-template-columns: 230px 1fr; min-height: 0; }
        .hn-ot-rail {
          background: var(--bg);
          border-right: 1px solid var(--border);
          padding: 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }
        .hn-ot-rail-item { display: flex; flex-direction: column; gap: 2px; }
        .hn-ot-content { padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px; }
        .hn-ot-two { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hn-ot-warranty { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; padding: 14px 16px; }
        .hn-ot-warranty > div { display: flex; flex-direction: column; gap: 3px; }
        .hn-ot-footer {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 18px;
          border-top: 1px solid var(--border);
          background: var(--bg);
          flex-shrink: 0;
        }
        .hn-ot-footer-group { display: flex; flex-direction: column; gap: 4px; }
        .hn-ot-footer-label { font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-faint); }
        .hn-ot-iconrow { display: flex; gap: 6px; }
        .hn-ot-icon {
          width: 32px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: var(--accent); color: #fff;
          border: none; border-radius: 6px; cursor: pointer;
          font-size: 10px; font-weight: 700;
          transition: background-color 0.14s ease;
        }
        .hn-ot-icon:hover { background: #1D4ED8; }

        @media (max-width: 1100px) {
          .hn-cst-layout { grid-template-columns: 1fr; }
          .hn-cst-detail { max-height: none; }
          .hn-cst-card { grid-template-columns: 90px 1fr; gap: 10px; }
          .hn-cst-card-meta, .hn-cst-card-flags { grid-column: 2; }
          .hn-ot-body { grid-template-columns: 1fr; }
          .hn-ot-rail { flex-direction: row; flex-wrap: wrap; gap: 16px; border-right: none; border-bottom: 1px solid var(--border); }
          .hn-ot-rail-item { flex: 0 0 calc(33% - 16px); }
        }
        @media (max-width: 720px) {
          .hn-cst-details-grid { grid-template-columns: 1fr 1fr; }
          .hn-cst-prod-body { grid-template-columns: 1fr; }
          .hn-cst-cust-grid { grid-template-columns: 1fr; }
          .hn-nt-grid { grid-template-columns: 1fr; }
          .hn-ot-two { grid-template-columns: 1fr; }
          .hn-ot-warranty { grid-template-columns: 1fr; }
        }

        /* ===== Quotations ===== */
        .hn-qt-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }
        .hn-qt-summary-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
        }
        .hn-qt-summary-cell.total { background: var(--header-dark); border-color: var(--header-dark); }
        .hn-qt-summary-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--text-faint);
        }
        .hn-qt-summary-cell.total .hn-qt-summary-label { color: rgba(255,255,255,0.55); }
        .hn-qt-summary-qty { font-size: 11px; color: var(--text-muted); }
        .hn-qt-summary-cell.total .hn-qt-summary-qty { color: rgba(255,255,255,0.6); }
        .hn-qt-summary-value { font-size: 18px; font-weight: 600; color: var(--text); }
        .hn-qt-summary-cell.total .hn-qt-summary-value { color: #60A5FA; }

        .hn-qt-toolbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .hn-qt-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          min-width: 240px;
          flex: 0 1 320px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-qt-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-qt-search-input { flex: 1; background: transparent; border: none; outline: none; font-size: 13.5px; color: var(--text); }
        .hn-qt-search-input::placeholder { color: var(--text-faint); font-family: 'Segoe UI', Arial, sans-serif; }

        .hn-qt-layout { display: grid; grid-template-columns: minmax(0, 2.3fr) minmax(0, 1fr); gap: 16px; align-items: start; }
        .hn-qt-main { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        .hn-qt-side { display: flex; flex-direction: column; gap: 16px; min-width: 0; }

        /* Quotation list */
        .hn-qt-list { display: flex; flex-direction: column; max-height: 260px; }
        .hn-qt-list-head, .hn-qt-row {
          display: grid;
          grid-template-columns: 90px 110px 90px 78px 78px minmax(0, 1.2fr) 90px 100px;
          gap: 8px;
          align-items: center;
          padding: 9px 14px;
        }
        .hn-qt-list-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--text-faint);
          position: sticky; top: 0; z-index: 1;
        }
        .hn-qt-list-body { overflow-y: auto; }
        .hn-qt-row {
          width: 100%; border: none; border-bottom: 1px solid var(--border);
          background: transparent; text-align: left; cursor: pointer;
          font-size: 12.5px; color: var(--text);
          transition: background-color 0.12s ease;
        }
        .hn-qt-row:last-child { border-bottom: none; }
        .hn-qt-row:hover { background: var(--bg); }
        .hn-qt-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-qt-ellip { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
        .hn-oo-badge.expired { background: rgba(220,38,38,0.1); color: #DC2626; }

        /* Products on quotation */
        .hn-qt-products { display: flex; flex-direction: column; max-height: 360px; }
        .hn-qt-prod-head, .hn-qt-prod-row {
          display: grid;
          grid-template-columns: 44px 130px minmax(0, 1fr) 44px 78px 70px 56px 80px 80px 70px 80px;
          gap: 8px;
          align-items: center;
          padding: 8px 14px;
        }
        .hn-qt-prod-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--text-faint);
          position: sticky; top: 0;
        }
        .hn-qt-prod-body { overflow-y: auto; }
        .hn-qt-prod-row { border-bottom: 1px solid var(--border); font-size: 11.5px; color: var(--text); }
        .hn-qt-prod-row:last-child { border-bottom: none; }
        .hn-qt-prod-row:hover { background: var(--bg); }
        .hn-qt-type {
          font-size: 10px; font-weight: 700; letter-spacing: 0.03em;
          color: var(--text-muted); background: var(--bg);
          border: 1px solid var(--border); padding: 1px 6px; border-radius: 4px;
        }
        /* Promotional quoted price — highlighted like the terminal's orange cells */
        .hn-qt-quoted-promo {
          display: inline-block;
          background: #EA580C; color: #fff;
          padding: 1px 7px; border-radius: 4px; font-weight: 600;
        }
        /* "Sc" current-price flag — the terminal shows a green/amber $ marker */
        .hn-qt-current-flag {
          display: inline-block;
          background: rgba(202,138,4,0.16); color: #B45309;
          padding: 1px 7px; border-radius: 4px; font-weight: 600;
        }

        .hn-qt-addnote { padding: 12px 14px; border-top: 1px solid var(--border); }
        .hn-qt-addnote-input {
          width: 100%;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 9px 11px;
          font-size: 12.5px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-qt-addnote-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-qt-side-info { display: flex; flex-direction: column; gap: 11px; padding: 14px 16px; }
        .hn-qt-side-info > div { display: flex; justify-content: space-between; gap: 16px; align-items: baseline; }
        .hn-qt-side-actions { display: flex; gap: 8px; padding: 0 16px 16px; }

        @media (max-width: 1100px) {
          .hn-qt-layout { grid-template-columns: 1fr; }
          .hn-qt-summary { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 720px) {
          .hn-qt-summary { grid-template-columns: 1fr; }
          .hn-qt-list-head, .hn-qt-prod-head { display: none; }
          .hn-qt-row, .hn-qt-prod-row { grid-template-columns: 1fr 1fr; gap: 4px 10px; }
        }

        /* ===== Sales KPIs ===== */
        .hn-kpi-headline {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 18px;
          padding: 18px 20px;
          background: linear-gradient(180deg, #1E3A8A, #1E40AF);
          border-radius: 14px;
          box-shadow: 0 8px 24px -12px rgba(30,58,138,0.5);
        }
        .hn-kpi-tile { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
        .hn-kpi-tile-value { font-size: 24px; font-weight: 700; color: #fff; line-height: 1; }
        .hn-kpi-tile-label { font-size: 10.5px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.6); }

        .hn-kpi-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .hn-kpi-tab {
          padding: 10px 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          cursor: pointer;
          /* Specific properties only — transition:all watches every animatable
             property (incl. layout ones like padding/width) on each style
             recalc, which is wasted work on weak hardware. */
          transition: border-color 0.14s ease, color 0.14s ease, background-color 0.14s ease;
        }
        .hn-kpi-tab:hover { border-color: var(--accent); color: var(--accent); }
        .hn-kpi-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; box-shadow: 0 4px 12px -4px rgba(37,99,235,0.5); }

        /* Delivered / Written toggle */
        .hn-kpi-typetoggle {
          display: inline-flex;
          padding: 4px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 999px;
          gap: 3px;
        }
        .hn-kpi-typebtn {
          padding: 8px 18px;
          border: none;
          background: transparent;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: background-color 0.14s ease, color 0.14s ease, box-shadow 0.14s ease;
        }
        .hn-kpi-typebtn:hover:not(.active) { color: var(--text); }
        .hn-kpi-typebtn.active { background: var(--accent); color: #fff; box-shadow: 0 3px 10px -4px rgba(37,99,235,0.5); }

        /* Gauge cards (salesperson + department targets) */
        .hn-kpi-gauge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
        }
        .hn-kpi-gauge-card {
          border: 2px solid var(--border);
          border-radius: 14px;
          padding: 14px 16px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .hn-kpi-gauge-name {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text);
          text-align: center;
          letter-spacing: 0.01em;
        }
        .hn-kpi-gauge-chips { display: flex; gap: 6px; width: 100%; }
        .hn-kpi-chip {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          padding: 5px 4px;
          border-radius: 7px;
          background: var(--surface);
          border: 1px solid var(--border);
        }
        .hn-kpi-chip span { font-size: 8.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-faint); }
        .hn-kpi-chip b { font-size: 13px; color: var(--text); }
        .hn-kpi-chip.should { background: #64748B; border-color: #64748B; }
        .hn-kpi-chip.should span { color: rgba(255,255,255,0.8); }
        .hn-kpi-chip.should b { color: #fff; }
        .hn-kpi-chip.mtd { border-color: transparent; }
        .hn-kpi-chip.mtd span { color: rgba(255,255,255,0.85); }
        .hn-kpi-chip.mtd b { color: #fff; }
        .hn-kpi-gauge-status { font-size: 15px; font-weight: 800; letter-spacing: 0.02em; }
        .hn-kpi-gauge-svg { width: 100%; max-width: 160px; height: auto; }
        .hn-kpi-gauge-val { font-size: 22px; font-weight: 800; font-family: Consolas, 'Courier New', monospace; }

        /* Salesperson Targets — logged-in identity header */
        .hn-kpi-myheader {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          margin-bottom: 16px;
          background: linear-gradient(180deg, rgba(37,99,235,0.06), rgba(37,99,235,0.01));
          border: 1px solid rgba(37,99,235,0.18);
          border-radius: 12px;
        }
        .hn-kpi-myheader-badge {
          width: 46px; height: 46px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 12px;
          background: var(--accent); color: #fff;
          font-weight: 800; font-size: 17px;
          font-family: Consolas, 'Courier New', monospace;
        }
        .hn-kpi-myheader-name { font-size: 18px; font-weight: 700; color: var(--text); }
        .hn-kpi-myheader-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

        /* YoY Growth */
        /* Month + range controls for the YoY Growth tab */
        .hn-kpi-growth-controls {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .hn-kpi-growth-ctrl { display: flex; flex-direction: column; gap: 6px; }
        .hn-kpi-month-select {
          height: 36px;
          padding: 0 32px 0 12px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          appearance: auto;
        }
        .hn-kpi-month-select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }

        /* Monthly trend strip — 12 clickable mini-bars */
        .hn-kpi-trend-hint { font-size: 11px; font-weight: 400; color: var(--text-faint); margin-left: 8px; }
        .hn-kpi-trend-strip {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 6px;
          padding: 14px 4px 6px;
        }
        .hn-kpi-trend-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 4px 2px 6px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: none;
          cursor: pointer;
          font: inherit;
        }
        .hn-kpi-trend-col:hover:not(.empty) { background: var(--accent-soft); }
        .hn-kpi-trend-col.active { border-color: var(--accent); background: var(--accent-soft); }
        .hn-kpi-trend-col.empty { cursor: default; opacity: 0.45; }
        .hn-kpi-trend-val { font-size: 10px; color: var(--text-muted); white-space: nowrap; }
        .hn-kpi-trend-track { width: 100%; max-width: 34px; height: 72px; display: flex; align-items: flex-end; background: rgba(15,23,42,0.05); border-radius: 4px; }
        .hn-kpi-trend-fill { width: 100%; background: #94A3B8; border-radius: 4px 4px 0 0; }
        .hn-kpi-trend-col.active .hn-kpi-trend-fill { background: linear-gradient(180deg, #60A5FA, #2563EB); }
        .hn-kpi-trend-month { font-size: 11px; color: var(--text-muted); }
        .hn-kpi-trend-col.active .hn-kpi-trend-month { color: var(--accent); font-weight: 700; }
        @media (max-width: 900px) {
          .hn-kpi-trend-strip { grid-template-columns: repeat(6, 1fr); }
        }

        /* Electrical sales mix donut */
        .hn-kpi-pie-wrap { display: flex; align-items: center; gap: 32px; padding: 20px 12px; flex-wrap: wrap; }
        .hn-kpi-pie { width: 190px; height: 190px; flex-shrink: 0; }
        .hn-kpi-pie-total { font-size: 17px; font-weight: 700; fill: var(--text); }
        .hn-kpi-pie-sub { font-size: 8.5px; fill: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; }
        .hn-kpi-pie-legend { display: flex; flex-direction: column; gap: 10px; flex: 1; min-width: 280px; }
        .hn-kpi-pie-row {
          display: grid;
          grid-template-columns: 14px 1fr 90px 64px;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
        }
        .hn-kpi-pie-sw { width: 12px; height: 12px; border-radius: 4px; }
        .hn-kpi-pie-label { font-size: 13px; font-weight: 500; }
        .hn-kpi-pie-val { font-size: 13px; color: var(--text-muted); text-align: right; }
        .hn-kpi-pie-pct { font-size: 13px; font-weight: 700; text-align: right; }
        @media (max-width: 760px) {
          .hn-kpi-pie-wrap { justify-content: center; }
          .hn-kpi-pie-row { grid-template-columns: 14px 1fr 80px 56px; }
        }

        /* ===== Cashiers — Retrieve Suspended / CNP / Till Balancing ===== */
        .hn-rs-head, .hn-rs-row {
          display: grid;
          grid-template-columns: 88px 48px 40px 96px 84px minmax(0, 1.25fr) 48px 62px 68px 66px;
          gap: 8px; align-items: center; padding: 8px 14px;
        }
        .hn-cnp-head, .hn-cnp-row {
          display: grid;
          grid-template-columns: 82px 72px minmax(0, 1.15fr) 82px 76px 104px 76px;
          gap: 8px; align-items: center; padding: 8px 14px;
        }
        .hn-rs-head, .hn-cnp-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--text-faint);
          position: sticky; top: 0; z-index: 1;
        }
        .hn-rs-row, .hn-cnp-row {
          width: 100%;
          border: none;
          border-bottom: 1px solid var(--border);
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-size: 12px;
          color: var(--text);
          transition: background-color 0.12s ease;
        }
        .hn-rs-row:last-child, .hn-cnp-row:last-child { border-bottom: none; }
        .hn-rs-row:hover, .hn-cnp-row:hover { background: var(--bg); }
        .hn-rs-row.active, .hn-cnp-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }

        .hn-tb-denom { display: grid; grid-template-columns: 74px 86px minmax(0, 1fr); gap: 10px; align-items: center; padding: 4px 0; }
        .hn-tb-tender { display: grid; grid-template-columns: minmax(0, 1fr) 96px 92px 92px; gap: 10px; align-items: center; padding: 6px 0; border-bottom: 1px dashed var(--border); font-size: 12.5px; }
        .hn-tb-tender:last-child { border-bottom: none; }
        .hn-tb-input {
          width: 100%; padding: 6px 9px;
          border: 1px solid var(--border); border-radius: 7px;
          background: var(--surface); color: var(--text);
          font-family: Consolas, monospace; font-size: 12.5px; text-align: right;
        }
        .hn-tb-input:focus { outline: none; border-color: var(--accent); }

        /* ============== CALCULATOR ============== */
        .hn-calc-screen { margin-bottom: 12px; }
        .hn-calc-display {
          width: 100%;
          height: 48px;
          padding: 0 12px;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          background: var(--surface);
          font-size: 20px;
          font-weight: 600;
          text-align: right;
          color: var(--text);
        }
        .hn-calc-display:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .hn-calc-preview {
          min-height: 18px;
          margin-top: 4px;
          font-size: 12.5px;
          color: var(--text-muted);
          text-align: right;
        }
        .hn-calc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; }
        .hn-calc-btn {
          height: 42px;
          border: 1px solid var(--border);
          border-radius: 10px;
          background: var(--surface);
          font-size: 16px;
          font-weight: 600;
          font-family: inherit;
          color: var(--text);
          cursor: pointer;
          transition: background-color 0.12s ease, border-color 0.12s ease;
        }
        .hn-calc-btn:hover { border-color: var(--accent); background: var(--accent-soft); }
        .hn-calc-btn.op { color: var(--accent); background: var(--accent-soft); border-color: transparent; }
        .hn-calc-btn.op:hover { border-color: var(--accent); }
        .hn-calc-btn.fn { color: #DC2626; background: rgba(220, 38, 38, 0.07); border-color: transparent; }
        .hn-calc-btn.fn:hover { border-color: #DC2626; }
        .hn-calc-btn.eq { grid-column: span 4; background: var(--accent); border-color: var(--accent); color: #fff; }
        .hn-calc-btn.eq:hover { background: #1D4ED8; }

        /* ============== NOTEPAD ============== */
        .hn-notepad-area {
          width: 100%;
          min-height: 220px;
          resize: vertical;
          padding: 10px 12px;
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          background: var(--surface);
          color: var(--text);
          font-family: 'Segoe UI', Arial, sans-serif;
          font-size: 13.5px;
          line-height: 1.5;
          outline: none;
        }
        .hn-notepad-area:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
        .hn-notepad-area::placeholder { color: var(--text-faint); }

        /* ============== SECURITY SCREENSAVER / LOCK ============== */
        .hn-lock-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          /* Opaque — nothing behind the lock is visible or clickable.
             Plain gradient, no blur, cheap to composite. */
          background: linear-gradient(165deg, #0A1830 0%, #123058 55%, #0A1830 100%);
        }
        .hn-lock-clock { text-align: center; color: #fff; }
        .hn-lock-time { font-size: 52px; font-weight: 600; letter-spacing: 0.02em; line-height: 1; }
        .hn-lock-date { margin-top: 8px; font-size: 14px; color: rgba(255, 255, 255, 0.65); }
        .hn-lock-panel {
          width: 400px;
          max-width: calc(100vw - 32px);
          background: var(--surface);
          border: 1px solid var(--border-strong);
          border-radius: 16px;
          padding: 26px 26px 22px;
          box-shadow: 0 4px 8px rgba(2, 8, 20, 0.25), 0 18px 40px -12px rgba(2, 8, 20, 0.55);
        }
        .hn-lock-head { display: flex; align-items: flex-start; gap: 14px; }
        .hn-lock-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          border-radius: 12px;
          background: var(--accent-soft);
          color: var(--accent);
        }
        .hn-lock-eye {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          padding: 4px;
          border: none;
          background: none;
          color: var(--text-muted);
          cursor: pointer;
        }
        .hn-lock-error {
          padding: 9px 12px;
          border: 1px solid rgba(220, 38, 38, 0.35);
          border-radius: 10px;
          background: rgba(220, 38, 38, 0.06);
          font-size: 12.5px;
          color: #B91C1C;
        }
        .hn-lock-unlock {
          height: 44px;
          border: none;
          border-radius: 10px;
          background: var(--accent);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background-color 0.14s ease;
        }
        .hn-lock-unlock:hover { background: #1D4ED8; }

        .hn-kpi-growth-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 16px; }
        .hn-kpi-growth-card {
          display: flex; flex-direction: column; gap: 4px;
          padding: 18px 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
        }
        .hn-kpi-growth-card-label { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); }
        .hn-kpi-growth-card-value { font-size: 30px; font-weight: 700; color: var(--text); line-height: 1.1; }
        .hn-kpi-growth-card-sub { font-size: 12.5px; font-weight: 600; color: var(--text-faint); }

        .hn-kpi-growth-chart {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          padding: 20px 18px 14px;
          min-height: 260px;
        }
        .hn-kpi-growth-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; height: 220px; justify-content: flex-end; }
        .hn-kpi-growth-bar-val { font-size: 10.5px; color: var(--text-muted); }
        .hn-kpi-growth-bar-track { width: 100%; max-width: 46px; flex: 1; display: flex; align-items: flex-end; }
        /* No height transition — animating height forces layout + paint every
           frame, which stutters on retail PCs. Bars snap to size instead. */
        .hn-kpi-growth-bar-fill { width: 100%; border-radius: 6px 6px 0 0; min-height: 4px; }
        .hn-kpi-growth-bar-delta { font-size: 10px; font-weight: 700; }
        .hn-kpi-growth-bar-year { font-size: 11px; color: var(--text-muted); }

        @media (max-width: 720px) {
          .hn-kpi-growth-summary { grid-template-columns: 1fr; }
          .hn-kpi-growth-bar-val, .hn-kpi-growth-bar-delta { display: none; }
        }

        /* Targets tables (salesperson + department) */
        .hn-kpi-tt-head, .hn-kpi-tt-row {
          display: grid;
          grid-template-columns: minmax(0, 1.4fr) 120px 120px minmax(120px, 1fr) 80px;
          gap: 14px;
          align-items: center;
          padding: 10px 18px;
        }
        .hn-kpi-tt-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--text-faint);
        }
        .hn-kpi-tt-body { display: flex; flex-direction: column; }
        .hn-kpi-tt-row { border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text); }
        .hn-kpi-tt-row:last-child { border-bottom: none; }
        .hn-kpi-tt-row:hover { background: var(--bg); }
        .hn-kpi-pct { text-align: right; font-weight: 700; }
        .hn-kpi-bar { height: 8px; background: var(--border); border-radius: 999px; overflow: hidden; }
        .hn-kpi-bar-fill { height: 100%; border-radius: 999px; } /* no width transition — layout-triggering */

        /* Store targets */
        .hn-kpi-store { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr); gap: 16px; align-items: start; }
        .hn-kpi-store-hero {
          background: linear-gradient(160deg, #2563EB, #1E3A8A);
          border-radius: 16px;
          padding: 28px 26px;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .hn-kpi-store-hero-label { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.7; }
        .hn-kpi-store-hero-value { font-size: 44px; font-weight: 700; line-height: 1; }
        .hn-kpi-store-hero-sub { font-size: 13px; opacity: 0.8; margin-bottom: 10px; }
        .hn-kpi-store-hero-bar { height: 10px; background: rgba(255,255,255,0.2); border-radius: 999px; overflow: hidden; }
        .hn-kpi-store-hero-fill { height: 100%; background: #60A5FA; border-radius: 999px; }
        .hn-kpi-store-hero-pct { font-size: 13px; font-weight: 600; margin-top: 8px; }
        .hn-kpi-store-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .hn-kpi-store-cell {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 18px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hn-kpi-store-cell-label { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); }
        .hn-kpi-store-cell-value { font-size: 26px; font-weight: 700; color: var(--text); line-height: 1.1; }
        .hn-kpi-store-cell-sub { font-size: 11.5px; color: var(--text-faint); }
        .hn-kpi-store-cell-pct { font-size: 14px; font-weight: 700; margin-top: 4px; }

        /* Rankings */
        .hn-kpi-rank-body { display: flex; flex-direction: column; }
        .hn-kpi-rank-row {
          display: grid;
          grid-template-columns: 44px minmax(0, 1.4fr) 120px minmax(120px, 1fr) 80px;
          gap: 14px;
          align-items: center;
          padding: 11px 18px;
          border-bottom: 1px solid var(--border);
          font-size: 13px;
        }
        .hn-kpi-rank-row:last-child { border-bottom: none; }
        .hn-kpi-rank-row.podium { background: rgba(37,99,235,0.03); }
        .hn-kpi-rank-medal {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 999px;
          font-family: Consolas, monospace; font-weight: 700; font-size: 13px;
          background: var(--border); color: var(--text-muted);
        }
        .hn-kpi-rank-medal.rank-1 { background: #FBBF24; color: #fff; }
        .hn-kpi-rank-medal.rank-2 { background: #94A3B8; color: #fff; }
        .hn-kpi-rank-medal.rank-3 { background: #B45309; color: #fff; }
        .hn-kpi-rank-name { font-weight: 500; }

        /* Comparison heatmap */
        .hn-kpi-compare-scroll { overflow-x: auto; }
        .hn-kpi-compare { border-collapse: collapse; width: 100%; min-width: 900px; }
        .hn-kpi-compare th, .hn-kpi-compare td {
          padding: 8px 10px;
          text-align: right;
          font-size: 11.5px;
          font-family: Consolas, monospace;
          border: 1px solid var(--border);
          white-space: nowrap;
        }
        .hn-kpi-compare th {
          background: var(--header-dark); color: #fff;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase;
          position: sticky; top: 0;
        }
        .hn-kpi-compare-namecol {
          text-align: left !important;
          position: sticky; left: 0;
          background: var(--surface);
          font-family: 'Segoe UI', Arial, sans-serif !important;
          font-weight: 600;
          z-index: 1;
        }
        .hn-kpi-compare th.hn-kpi-compare-namecol { background: var(--header-dark); z-index: 2; }
        .hn-kpi-compare td { font-weight: 700; font-size: 12px; }
        .hn-kpi-legend { display: flex; flex-wrap: wrap; gap: 16px; padding: 12px 16px; border-top: 1px solid var(--border); font-size: 11.5px; color: var(--text-muted); }
        .hn-kpi-legend span { display: inline-flex; align-items: center; gap: 6px; }
        .hn-kpi-legend-sw { width: 14px; height: 14px; border-radius: 4px; display: inline-block; }

        @media (max-width: 1100px) {
          .hn-kpi-headline { grid-template-columns: repeat(3, 1fr); }
          .hn-kpi-store { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .hn-kpi-headline { grid-template-columns: repeat(2, 1fr); }
          .hn-kpi-store-grid { grid-template-columns: 1fr; }
          .hn-kpi-tt-head { display: none; }
          .hn-kpi-tt-row, .hn-kpi-rank-row { grid-template-columns: 1fr 1fr; gap: 6px 10px; }
          .hn-kpi-gauge-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
        }

        /* ===== Online Quick Reservations ===== */
        .hn-rs-toolbar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .hn-rs-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          min-width: 260px;
          flex: 0 1 360px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .hn-rs-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(37,99,235,0.12); }
        .hn-rs-search-input { flex: 1; background: transparent; border: none; outline: none; font-size: 13.5px; color: var(--text); }
        .hn-rs-search-input::placeholder { color: var(--text-faint); font-family: 'Segoe UI', Arial, sans-serif; }
        .hn-rs-movex {
          display: inline-flex; align-items: center; gap: 8px;
          margin-left: auto;
          padding: 8px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 999px;
        }

        .hn-rs-layout { display: grid; grid-template-columns: minmax(0, 2.2fr) minmax(0, 1fr); gap: 16px; align-items: start; }
        .hn-rs-main { display: flex; flex-direction: column; gap: 16px; min-width: 0; }
        .hn-rs-side { display: flex; flex-direction: column; gap: 16px; min-width: 0; }

        /* Reservation list */
        .hn-rs-list { display: flex; flex-direction: column; max-height: 280px; }
        .hn-rs-list-head, .hn-rs-row {
          display: grid;
          grid-template-columns: 92px 130px 160px 90px minmax(0, 1fr) 120px;
          gap: 8px;
          align-items: center;
          padding: 9px 14px;
        }
        .hn-rs-list-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--text-faint);
          position: sticky; top: 0; z-index: 1;
        }
        .hn-rs-list-body { overflow-y: auto; }
        .hn-rs-row {
          width: 100%; border: none; border-bottom: 1px solid var(--border);
          background: transparent; text-align: left; cursor: pointer;
          font-size: 12.5px; color: var(--text);
          transition: background-color 0.12s ease;
        }
        .hn-rs-row:last-child { border-bottom: none; }
        .hn-rs-row:hover { background: var(--bg); }
        .hn-rs-row.active { background: var(--accent-soft); box-shadow: inset 3px 0 0 var(--accent); }
        .hn-rs-ellip { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }

        /* Reservation items */
        .hn-rs-items { display: flex; flex-direction: column; }
        .hn-rs-items-head, .hn-rs-items-row {
          display: grid;
          grid-template-columns: 56px 130px minmax(0, 1fr) 60px 90px 90px 100px;
          gap: 10px;
          align-items: center;
          padding: 9px 16px;
        }
        .hn-rs-items-head {
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: Consolas, monospace;
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--text-faint);
        }
        .hn-rs-items-row { border-bottom: 1px solid var(--border); font-size: 12px; color: var(--text); }
        .hn-rs-items-row:last-child { border-bottom: none; }

        /* Inventory + notes */
        .hn-rs-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .hn-rs-inv { display: flex; flex-direction: column; padding: 10px 16px; }
        .hn-rs-inv > div { display: flex; justify-content: space-between; gap: 16px; padding: 7px 0; font-size: 12.5px; color: var(--text-muted); border-bottom: 1px solid var(--border); }
        .hn-rs-inv > div:last-child { border-bottom: none; }
        .hn-rs-inv > div span:last-child { color: var(--text); font-weight: 500; }
        .hn-rs-inv-total { font-weight: 700; }
        .hn-rs-inv-total span { color: var(--accent) !important; }
        .hn-rs-prodnote { padding: 14px 16px; font-size: 13px; line-height: 1.5; color: var(--text); white-space: pre-wrap; min-height: 60px; }

        /* Customer side panel */
        .hn-rs-cust { padding: 14px 16px; }
        .hn-rs-custno { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); font-size: 11.5px; color: var(--text-faint); }
        .hn-rs-actions { display: flex; flex-direction: column; gap: 8px; padding: 14px 16px; }
        .hn-rs-action-btn {
          width: 100%;
          padding: 9px 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          text-align: left;
          transition: border-color 0.14s ease, background-color 0.14s ease, color 0.14s ease;
        }
        .hn-rs-action-btn:hover { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }

        @media (max-width: 1100px) {
          .hn-rs-layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 720px) {
          .hn-rs-two { grid-template-columns: 1fr; }
          .hn-rs-list-head, .hn-rs-items-head { display: none; }
          .hn-rs-row, .hn-rs-items-row { grid-template-columns: 1fr 1fr; gap: 4px 10px; }
          .hn-rs-movex { margin-left: 0; }
        }

        /* ===== Invoice Modification — detail layout ===== */
        .hn-modify-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 16px;
          align-items: start;
          margin-bottom: 0;
        }

        /* Financial ledger sidebar */
        .hn-ledger-panel {
          background: var(--header-dark);
          border-radius: 14px;
          padding: 20px 18px;
          color: rgba(255,255,255,0.92);
          position: sticky;
          top: 20px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 8px 24px -8px rgba(15,23,42,0.40);
        }
        .hn-ledger-panel .hn-panel-title {
          color: rgba(255,255,255,0.5);
        }
        .hn-ledger-rows {
          display: flex;
          flex-direction: column;
        }
        .hn-ledger-row {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 11px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .hn-ledger-row:last-child { border-bottom: none; padding-bottom: 0; }
        .hn-ledger-row-balance {
          margin-top: 6px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.18) !important;
          border-bottom: none !important;
        }
        .hn-ledger-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .hn-ledger-row-balance .hn-ledger-label {
          color: rgba(255,255,255,0.6);
        }
        .hn-ledger-value {
          font-size: 17px;
          font-weight: 600;
          color: rgba(255,255,255,0.92);
          letter-spacing: 0.02em;
        }
        .hn-ledger-value-balance {
          font-size: 22px;
          color: #60A5FA;
        }

        @media (max-width: 900px) {
          .hn-modify-layout {
            grid-template-columns: 1fr !important;
          }
          .hn-ledger-panel { position: static; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hn-app *,
          .hn-app *::before,
          .hn-app *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 960px) {
          .hn-sidebar { width: 250px; }
          .hn-content { padding: 32px 28px 24px; }
          .hn-content-title { font-size: 34px; }
        }

        @media (max-width: 720px) {
          .hn-topbar-right { display: none !important; }
          .hn-browse-dialog,
          .hn-browse-dialog-wide { width: calc(100vw - 32px); }
          .hn-filters-grid { grid-template-columns: 1fr 1fr; }
          .hn-invoice-top { grid-template-columns: 1fr !important; }
          .hn-cust-grid { grid-template-columns: 1fr !important; }
          .hn-pg-layout { grid-template-columns: 1fr !important; max-height: none; }

          .hn-body { flex-direction: column; }
          .hn-sidebar {
            width: 100%;
            flex-direction: row;
            align-items: center;
            overflow-x: auto;
            padding: 10px 12px;
            gap: 8px;
          }
          .hn-sidebar-nav { flex-direction: row; gap: 8px; }
          .hn-side-item {
            width: auto !important;
            grid-template-columns: auto auto !important;
            flex-shrink: 0;
            padding: 9px 14px;
            gap: 9px;
          }
          .hn-side-item.has-icon { grid-template-columns: auto auto !important; }
          .hn-side-item .hn-side-icon,
          .hn-side-item .hn-side-chev { display: none; }
          .hn-side-label { white-space: nowrap; }
          .hn-side-back { margin: 0; flex-shrink: 0; white-space: nowrap; }
          .hn-content { padding: 28px 20px 20px; }
        }
`;

export default function HarveyNormanPOS() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [operatorNumber, setOperatorNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [browseOpen, setBrowseOpen] = useState(false);
  const [customerSearchOpen, setCustomerSearchOpen] = useState(false);
  const [invoiceLookupOpen, setInvoiceLookupOpen] = useState(false);
  const [productGroupsOpen, setProductGroupsOpen] = useState(false);

  // Navigation stack — top of the stack is the visible screen once logged in
  const [navStack, setNavStack] = useState(['home']);
  const currentScreen = navStack[navStack.length - 1];

  // Invoice / customer flow
  const [invoiceOperator, setInvoiceOperator] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [activeCustomer, setActiveCustomer] = useState(null);
  const [invoiceNotes, setInvoiceNotes] = useState('');
  const [paymentType, setPaymentType] = useState('cash'); // 'cash' | 'card' | 'latitude'
  // Set when the invoice screen is showing an EXISTING invoice reopened via
  // Alt+I, rather than a brand-new one being built through the customer-search
  // flow. Kept separate from activeCustomer/invoiceNotes so the two paths never
  // collide — starting a genuinely new invoice always clears this.
  const [reopenedInvoice, setReopenedInvoice] = useState(null);

  // Customer popups
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [createPrefill, setCreatePrefill] = useState(null);
  const [multiResults, setMultiResults] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [paymentTypeOpen, setPaymentTypeOpen] = useState(false);
  const [salespersonOpen, setSalespersonOpen] = useState(false);

  // Invoice Modification — reached via the Alt+I Invoice Lookup popup (press M
  // there to arm modify mode, then search or pick a saved invoice).
  const [modifyInvoice, setModifyInvoice] = useState(null); // the found invoice record

  // Alt+I saved invoices ("starred") — a small rolling list the operator can
  // pin invoices to for the session. Capped at SAVED_INVOICES_MAX; adding
  // beyond that drops the oldest entry. Cleared on logout.
  const [savedInvoices, setSavedInvoices] = useState([]);

  // Online Orders screen
  const [onlineOrderSel, setOnlineOrderSel] = useState('31003992413'); // selected orderNo
  const [onlineOrderQuery, setOnlineOrderQuery] = useState('');
  const [onlineOrderDispatch, setOnlineOrderDispatch] = useState('all'); // all | Delivery | Pick up

  // Undelivered Sales screen
  const [undeliveredSel, setUndeliveredSel] = useState('3302882'); // selected invoiceNo
  const [undeliveredQuery, setUndeliveredQuery] = useState('');

  // Customer Service Tickets screen
  const [cstSel, setCstSel] = useState('21274'); // selected ticketNo
  const [cstQuery, setCstQuery] = useState('');
  const [cstCurrentUser, setCstCurrentUser] = useState(false);
  const [cstOpenTicket, setCstOpenTicket] = useState(null); // ticketNo shown in Open Ticket detail, or null
  const [cstNewTicketOpen, setCstNewTicketOpen] = useState(false);

  // Quotations screen
  const [quoteSel, setQuoteSel] = useState('3261400'); // selected quotationNo
  const [quoteQuery, setQuoteQuery] = useState('');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('All Open'); // All Open | Expired | Renewed | Active | All
  const [quoteCurrentUser, setQuoteCurrentUser] = useState(true);

  // Online Quick Reservations screen
  const [resSel, setResSel] = useState('R22390906'); // selected reservation number
  const [resQuery, setResQuery] = useState('');
  const [resShowCompleted, setResShowCompleted] = useState(false);
  const [resShowWithdrawn, setResShowWithdrawn] = useState(false);

  // New Invoice — feature placeholder dialog (F3/F11/F2/Alt+F11 pending SAP)
  const [invFeature, setInvFeature] = useState(null); // 'orderDetail' | 'productItems' | 'modifyProduct' | 'tape' | null

  // Sales KPIs screen
  const [kpiTab, setKpiTab] = useState('salesperson'); // salesperson | department | store | rankings | comparison | growth
  const [kpiSalesType, setKpiSalesType] = useState('delivered'); // delivered | written
  const [kpiMonth, setKpiMonth] = useState(KPI_LATEST_COMPLETE_MONTH); // 0–11, YoY Growth month picker
  const [kpiYearSpan, setKpiYearSpan] = useState(10); // 5 | 10 — how far back the YoY chart looks
  const [kpiRankSort, setKpiRankSort] = useState('pct'); // 'pct' (% of target) | 'mtd' ($ sold)

  // Home-screen logout confirmation (Esc → prompt, Esc again → cancel, Enter → confirm)
  const [logoutPrompt, setLogoutPrompt] = useState(false);

  // Floating calculator (Alt+K or topbar button) — available on any screen
  const [calcOpen, setCalcOpen] = useState(false);

  // Security screensaver: locks the terminal after LOCK_TIMEOUT_MS of
  // inactivity, or immediately via the topbar Lock button.
  const [locked, setLocked] = useState(false);
  const lastActivityRef = useRef(Date.now());

  // Floating notepad (Alt+N). Content survives close/re-open, cleared on logout.
  const [padOpen, setPadOpen] = useState(false);
  const [padText, setPadText] = useState('');

  // ---- Purchase Request screens ----
  // Manual Purchase Request (photo 4): supplier + line items.
  const [prSupplier, setPrSupplier] = useState('');
  const [prLines, setPrLines] = useState([]);
  // Purchase Request and Approvals (photo 3): selected row + per-row status.
  const [praSelected, setPraSelected] = useState(PRA_REQUESTS[0].id);
  const [praStatus, setPraStatus] = useState(() => Object.fromEntries(PRA_REQUESTS.map((r) => [r.id, 'pending'])));
  const [praFilter, setPraFilter] = useState('');
  // Rebuild Suggested Purchase Request (photo 2): options form.
  const [rebuildForm, setRebuildForm] = useState({ division: 'L3M', department: '', supplier: '' });
  const [rebuildSaved, setRebuildSaved] = useState(false);

  // ---- Cash Sale (photo 1) ----
  const [csCustomer, setCsCustomer] = useState('');
  const [csPostcode, setCsPostcode] = useState('');
  const [csProduct, setCsProduct] = useState('');
  const [csQty, setCsQty] = useState('1');
  const [csLines, setCsLines] = useState([]);
  const csSaleNo = useRef(String(7436789 + Math.floor(Math.random() * 900))).current;
  // ---- Barcode Label Printing ----
  const [blProduct, setBlProduct] = useState('');
  const [blCount, setBlCount] = useState('1');
  const [blFormat, setBlFormat] = useState('Shelf Label (Small)');
  const [blQueue, setBlQueue] = useState([]);
  // ---- All Insurance Invoices ----
  const [insClaim, setInsClaim] = useState('');
  // ---- Incoming EDI Orders ----
  const [ediOrderNo, setEdiOrderNo] = useState('');
  const [ediCustomer, setEdiCustomer] = useState('');
  const [ediShowProcessed, setEdiShowProcessed] = useState(false);
  // ---- Product Care Orders ----
  const [pcoSelected, setPcoSelected] = useState('PO-BS-010091348');
  const [pcoName, setPcoName] = useState('');
  const [pcoStatus, setPcoStatus] = useState('Open Orders');

  // ---- Cashiers screens (photos 1–7) ----
  // Retrieve Suspended Sale
  const [rsInvoiceQ, setRsInvoiceQ] = useState('');
  const [rsTxnQ, setRsTxnQ] = useState('');
  const [rsNameQ, setRsNameQ] = useState('');
  const [rsSel, setRsSel] = useState(MOCK_SUSPENDED_SALES[0].id);
  const [rsNotice, setRsNotice] = useState('');
  // Pending Invoice Cancelation
  const [pcQuery, setPcQuery] = useState('');
  const [pcInvoice, setPcInvoice] = useState(null);
  const [pcError, setPcError] = useState('');
  const [pcReasonOpen, setPcReasonOpen] = useState(false); // Cancellation Reason Code popup
  const [pcReason, setPcReason] = useState('');
  const [pcListOpen, setPcListOpen] = useState(false);     // F4=List inside the popup
  const [pcDone, setPcDone] = useState(null);              // { invoiceId, reason }
  // Invoice Further Payments
  const [fpQuery, setFpQuery] = useState('');
  const [fpInvoice, setFpInvoice] = useState(null);
  const [fpError, setFpError] = useState('');
  const [fpAmount, setFpAmount] = useState('');
  const [fpMethod, setFpMethod] = useState('EFTPOS');
  const [fpPayments, setFpPayments] = useState([]);        // payments taken this session
  // Till Balancing
  const [tbCounts, setTbCounts] = useState(() => Object.fromEntries(TILL_DENOMS.map((d) => [String(d), ''])));
  const [tbCounted, setTbCounted] = useState(() => Object.fromEntries(TILL_TENDERS.filter((t) => !t.cashLinked).map((t) => [t.id, ''])));
  const [tbNotice, setTbNotice] = useState('');
  // CNP Transactions
  const [cnpSel, setCnpSel] = useState(CNP_REQUESTS[0].id);
  const [cnpQuery, setCnpQuery] = useState('');
  const [cnpNotice, setCnpNotice] = useState('');

  // Light/dark theme, remembered per operator for this session. (No browser
  // storage is available here, so preferences reset on a full page reload.)
  const [theme, setTheme] = useState('light');
  const themePrefsRef = useRef({});
  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      if (operatorNumber) themePrefsRef.current[operatorNumber] = next;
      return next;
    });
  };

  // Time-of-day greeting for the home screen.
  const operatorGreeting = () => {
    const h = new Date().getHours();
    const part = h < 12 ? 'Morning' : h < 17 ? 'Afternoon' : 'Evening';
    const name = OPERATOR_NAMES[operatorNumber];
    return `Good ${part}, ${name ? name.split(' ')[0] : 'Operator'}`;
  };

  const anyPopupOpen =
    browseOpen || customerSearchOpen || invoiceLookupOpen || productGroupsOpen ||
    !!confirmTarget || !!multiResults ||
    notesOpen || paymentTypeOpen || salespersonOpen ||
    !!cstOpenTicket || cstNewTicketOpen || !!invFeature || calcOpen || padOpen || pcReasonOpen;

  const invoiceOperatorRef = useRef(null);

  const operatorRef = useRef(null);
  const passwordRef = useRef(null);

  // Auto-focus the operator number field whenever the login screen is shown
  useEffect(() => {
    if (!isLoggedIn && operatorRef.current) {
      operatorRef.current.focus();
    }
  }, [isLoggedIn]);

  // Global Alt+B / Option+B (product browse), Alt+C / Option+C (customer search),
  // and Alt+I / Option+I (reopen invoice). We match on e.code instead of e.key
  // because on macOS Option produces dead keys: Option+B → ∫, Option+C → ç,
  // Option+I → dead-key accent — none of which match 'b' / 'c' / 'i'.
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (!isLoggedIn || locked) return;
      if (e.altKey && e.code === 'KeyB') {
        e.preventDefault();
        setBrowseOpen((b) => !b);
      }
      if (e.altKey && e.code === 'KeyC') {
        e.preventDefault();
        setCustomerSearchOpen((c) => !c);
      }
      if (e.altKey && e.code === 'KeyI') {
        e.preventDefault();
        setInvoiceLookupOpen((v) => !v);
      }
      if (e.altKey && e.code === 'KeyG') {
        e.preventDefault();
        setProductGroupsOpen((v) => !v);
      }
      // Alt+K / Option+K — floating calculator (K avoids C=customer clash)
      if (e.altKey && e.code === 'KeyK') {
        e.preventDefault();
        setCalcOpen((v) => !v);
      }
      // Alt+N / Option+N — floating notepad (text persists until logout)
      if (e.altKey && e.code === 'KeyN') {
        e.preventDefault();
        setPadOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isLoggedIn, locked]);

  // Operator + password rules
  const opValid = /^\d{4}$/.test(operatorNumber);
  const pwdDigitCount = (password.match(/\d/g) || []).length;
  const pwdLetterCount = (password.match(/[a-zA-Z]/g) || []).length;
  const pwdLen = password.length >= 8 && password.length <= 16;
  const pwdLetter = pwdLetterCount >= 4;
  const pwdDigit = pwdDigitCount >= 4;
  const pwdValid = pwdLen && pwdLetter && pwdDigit;
  const formValid = opValid && pwdValid;

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!opValid) {
      setError('Operator number must be exactly 4 digits.');
      return;
    }
    if (!pwdValid) {
      setError('Password must be 8–16 characters with at least 4 digits and 4 letters.');
      return;
    }
    setError('');
    setIsLoggedIn(true);
    // Restore this operator's saved theme (defaults to light).
    setTheme(themePrefsRef.current[operatorNumber] || 'light');
  };

  const handleLogout = () => {
    // Full session reset. This is a state reset on the same mounted component —
    // no page reload, no new window — so it's instant and keeps the JS/CSS warm
    // in memory. Clearing every field here guarantees the next operator starts
    // from a blank terminal with no leftover data from the previous session.
    setIsLoggedIn(false);
    setOperatorNumber('');
    setPassword('');
    setShowPwd(false);
    setError('');
    setActiveMenu(null);
    setBrowseOpen(false);
    setCustomerSearchOpen(false);
    setInvoiceLookupOpen(false);
    setProductGroupsOpen(false);
    setNavStack(['home']);
    // Invoice / customer flow
    setInvoiceOperator('');
    setSearchPhone('');
    setSearchAddress('');
    setActiveCustomer(null);
    setInvoiceNotes('');
    setPaymentType('cash');
    setReopenedInvoice(null);
    setConfirmTarget(null);
    setCreatePrefill(null);
    setMultiResults(null);
    setNotesOpen(false);
    setPaymentTypeOpen(false);
    setSalespersonOpen(false);
    // Invoice Modification + Alt+I saved invoices
    setModifyInvoice(null);
    setSavedInvoices([]);
    // Cashiers screens
    setRsInvoiceQ(''); setRsTxnQ(''); setRsNameQ('');
    setRsSel(MOCK_SUSPENDED_SALES[0].id); setRsNotice('');
    setPcQuery(''); setPcInvoice(null); setPcError('');
    setPcReasonOpen(false); setPcReason(''); setPcListOpen(false); setPcDone(null);
    setFpQuery(''); setFpInvoice(null); setFpError(''); setFpAmount(''); setFpMethod('EFTPOS'); setFpPayments([]);
    setTbCounts(Object.fromEntries(TILL_DENOMS.map((d) => [String(d), ''])));
    setTbCounted(Object.fromEntries(TILL_TENDERS.filter((t) => !t.cashLinked).map((t) => [t.id, ''])));
    setTbNotice('');
    setCnpSel(CNP_REQUESTS[0].id); setCnpQuery(''); setCnpNotice('');
    // Customer Service Tickets
    setCstOpenTicket(null);
    setCstNewTicketOpen(false);
    setCstQuery('');
    setInvFeature(null);
    setLogoutPrompt(false);
    setCalcOpen(false);
    setLocked(false);
    setPadOpen(false);
    setPadText(''); // notepad is per-session: gone once you log out
    setTheme('light');
    // KPI view preferences are per-operator too
    setKpiTab('salesperson');
    setKpiSalesType('delivered');
    setKpiMonth(KPI_LATEST_COMPLETE_MONTH);
    setKpiYearSpan(10);
    setKpiRankSort('pct');
  };

  // ---- Security screensaver: inactivity lock (see LOCK_TIMEOUT_MS) ----
  // Activity events just stamp a ref (a plain assignment — no re-render, no
  // timer churn on every mousemove); a 1s interval checks elapsed time. This
  // is far cheaper on retail hardware than resetting a setTimeout per event.
  useEffect(() => {
    if (!isLoggedIn || locked) return;
    const bump = () => { lastActivityRef.current = Date.now(); };
    const events = ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart'];
    events.forEach((ev) => window.addEventListener(ev, bump, { passive: true }));
    lastActivityRef.current = Date.now();
    const id = setInterval(() => {
      if (Date.now() - lastActivityRef.current >= LOCK_TIMEOUT_MS) lockNow();
    }, 1000);
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, bump));
      clearInterval(id);
    };
  }, [isLoggedIn, locked]);

  // Lock the terminal immediately: used by the inactivity timer and the
  // topbar Lock button (for stepping away from the desk). Floating popups are
  // closed first — their window-level key handlers would otherwise react to
  // typing on the lock screen, and any customer data in them shouldn't sit
  // behind the lock anyway. The notepad closes too, but its text persists.
  const lockNow = () => {
    setBrowseOpen(false); setCustomerSearchOpen(false); setInvoiceLookupOpen(false);
    setProductGroupsOpen(false); setNotesOpen(false); setPaymentTypeOpen(false);
    setSalespersonOpen(false); setCstNewTicketOpen(false); setCstOpenTicket(null);
    setInvFeature(null); setConfirmTarget(null); setMultiResults(null);
    setCalcOpen(false); setPadOpen(false); setLogoutPrompt(false); setPcReasonOpen(false);
    setLocked(true);
  };

  // Unlock from the screensaver. Same operator → resume exactly where they
  // left off. Different (valid) operator → previous session is fully logged
  // out and the new operator starts fresh at the home menu.
  const handleUnlock = (op, pwd) => {
    if (!/^\d{4}$/.test(op)) return 'Operator number must be exactly 4 digits.';
    const digits = (pwd.match(/\d/g) || []).length;
    const letters = (pwd.match(/[a-zA-Z]/g) || []).length;
    if (!(pwd.length >= 8 && pwd.length <= 16 && digits >= 4 && letters >= 4)) {
      return 'Password must be 8–16 characters with at least 4 digits and 4 letters.';
    }
    if (op === operatorNumber) {
      setLocked(false); // resume the existing session untouched
      return '';
    }
    // Different operator: clean-slate the old session, then sign them in.
    // handleLogout() and the setters below batch into one render, so there's
    // no flash of the login screen in between.
    handleLogout();
    setOperatorNumber(op);
    setIsLoggedIn(true);
    setTheme(themePrefsRef.current[op] || 'light');
    setLocked(false);
    return '';
  };

  // ---- Navigation ----
  const pushScreen = (s) => {
    setActiveMenu(null);
    setNavStack((prev) => [...prev, s]);
  };
  const goBack = () => {
    setActiveMenu(null);
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  // ---- Menu selection ----
  const flashMenu = (key) => {
    setActiveMenu(key);
    setTimeout(() => setActiveMenu((cur) => (cur === key ? null : cur)), 1400);
  };

  const startInvoiceNew = () => {
    setInvoiceOperator(operatorNumber);
    setSearchPhone('');
    setSearchAddress('');
    setActiveCustomer(null);
    setInvoiceNotes('');
    pushScreen('invoiceSearch');
  };

  const handleHomeSelect = (key) => {
    if (key === '1') { pushScreen('salesperson'); return; }
    if (key === '2') { pushScreen('cashiers'); return; }
    if (key === '3') { pushScreen('inventory'); return; }
    if (key === '4') { pushScreen('purchasing'); return; }
    if (key === '5') { pushScreen('reports'); return; }
    if (key === '6') { pushScreen('otherProprietor'); return; }
    if (key === '7') { pushScreen('invoiceEnquiry'); return; }
    if (key === '8') { pushScreen('eod'); return; }
    if (key === '0') { pushScreen('other'); return; }
    flashMenu(key);
  };

  const handleSalespersonSelect = (key) => {
    if (key === '1') { pushScreen('cashSale'); return; }
    if (key === '2') { startInvoiceNew(); return; }
    if (key === '3') { pushScreen('undeliveredSales'); return; }
    if (key === '4') { pushScreen('purchaseRequest'); return; }
    if (key === '5') { pushScreen('insuranceInvoices'); return; }
    if (key === '6') { pushScreen('ediOrders'); return; }
    if (key === '7') { pushScreen('onlineOrders'); return; }
    if (key === 'S') { pushScreen('productCareOrders'); return; }
    flashMenu(key);
  };

  // Salesperson → Purchase Request Menu → the three PR screens
  const handlePurchaseRequestSelect = (key) => {
    if (key === '1') { setPrLines([]); setPrSupplier(''); pushScreen('manualPR'); return; }
    if (key === '2') { pushScreen('prApprovals'); return; }
    if (key === '3') { pushScreen('rebuildPR'); return; }
    flashMenu(key);
  };

  const handleCashiersSelect = (key) => {
    if (key === '1') { pushScreen('retrieveSuspended'); return; }
    if (key === '2') { pushScreen('pendingCancel'); return; }
    if (key === '3') { pushScreen('furtherPayments'); return; }
    if (key === '4') { pushScreen('sundriesMenu'); return; }
    if (key === '5') { pushScreen('otherPosMenu'); return; }
    if (key === '6') { pushScreen('tillBalancing'); return; }
    if (key === '7') { pushScreen('cnpTransactions'); return; }
    flashMenu(key);
  };

  // Cashiers → the two payment submenus (photos 4 & 5). Everything except
  // All Insurance Invoices is a placeholder until SAP is wired up.
  const handleSundriesSelect = (key) => flashMenu(key);
  const handleOtherPosSelect = (key) => {
    if (key === '5') { pushScreen('insuranceInvoices'); return; }
    flashMenu(key);
  };

  const handleInventorySelect = (key) => {
    if (key === '9') { pushScreen('barcodePrint'); return; }
    flashMenu(key);
  };
  const handlePurchasingSelect = (key) => flashMenu(key);
  const handleReportsSelect = (key) => flashMenu(key);
  const handleOtherProprietorSelect = (key) => flashMenu(key);
  const handleInvoiceEnquirySelect = (key) => flashMenu(key);
  const handleEodSelect = (key) => flashMenu(key);
  const handleOtherSelect = (key) => {
    if (key === '2') { pushScreen('reservations'); return; }
    if (key === '3') { pushScreen('quotations'); return; }
    if (key === '5') { pushScreen('customerServiceTickets'); return; }
    if (key === '6') { pushScreen('salesKpis'); return; }
    flashMenu(key);
  };

  // ---- Sidebar / menu shell config ----
  // Maps each menu screen to its items, icon set, select handler and label.
  const MENU_CONFIG = {
    home: { items: HOME_MENU, onSelect: handleHomeSelect, icons: HOME_ICONS },
    salesperson: { items: SALESPERSON_MENU, onSelect: handleSalespersonSelect, icons: SALESPERSON_ICONS },
    cashiers: { items: CASHIERS_MENU, onSelect: handleCashiersSelect, icons: CASHIERS_ICONS },
    inventory: { items: INVENTORY_MENU, onSelect: handleInventorySelect, icons: INVENTORY_ICONS },
    purchasing: { items: PURCHASING_MENU, onSelect: handlePurchasingSelect, icons: PURCHASING_ICONS },
    reports: { items: REPORTS_MENU, onSelect: handleReportsSelect, icons: REPORTS_ICONS },
    otherProprietor: { items: OTHER_PROPRIETOR_MENU, onSelect: handleOtherProprietorSelect, icons: OTHER_PROPRIETOR_ICONS },
    invoiceEnquiry: { items: INVOICE_ENQUIRY_MENU, onSelect: handleInvoiceEnquirySelect, icons: INVOICE_ENQUIRY_ICONS },
    eod: { items: EOD_MENU, onSelect: handleEodSelect, icons: EOD_ICONS },
    other: { items: OTHER_MENU, onSelect: handleOtherSelect, icons: OTHER_ICONS },
    purchaseRequest: { items: PURCHASE_REQUEST_MENU, onSelect: handlePurchaseRequestSelect, icons: PURCHASE_REQUEST_ICONS },
    sundriesMenu: { items: SUNDRIES_MENU, onSelect: handleSundriesSelect, icons: SUNDRIES_ICONS },
    otherPosMenu: { items: OTHER_POS_MENU, onSelect: handleOtherPosSelect, icons: OTHER_POS_ICONS },
  };
  const MENU_SCREENS = Object.keys(MENU_CONFIG);

  // Which menu the sidebar should show. Content screens (invoice flows) fall
  // back to their nearest menu ancestor so the sidebar stays in context.
  const sidebarScreen = MENU_SCREENS.includes(currentScreen)
    ? currentScreen
    : [...navStack].reverse().find((s) => MENU_SCREENS.includes(s)) || 'home';

  // Highlight the item we're under: the flashed key on a menu screen, or
  // Invoice New (key 2) while inside the invoice flow.
  const sidebarActiveKey = MENU_SCREENS.includes(currentScreen)
    ? activeMenu
    : currentScreen === 'invoiceSearch' || currentScreen === 'invoice'
    ? '2'
    : null;

  // Click a sidebar item: if we're on a deeper screen, return to the menu
  // first, then run its handler. Functional state updates compose in order.
  const selectSidebarItem = (key) => {
    if (currentScreen !== sidebarScreen) {
      setActiveMenu(null);
      setNavStack((prev) => {
        const idx = prev.lastIndexOf(sidebarScreen);
        return idx >= 0 ? prev.slice(0, idx + 1) : prev;
      });
    }
    MENU_CONFIG[sidebarScreen].onSelect(key);
  };

  // ---- Customer search + popups ----
  const runCustomerSearch = () => {
    const phone = searchPhone.trim();
    const addr = searchAddress.trim();
    if (phone) {
      const results = searchCustomersByPhone(phone);
      if (results.length >= 1) setConfirmTarget(results[0]);
      else {
        setCreatePrefill({ phone, address: '' });
        pushScreen('createCustomer');
      }
    } else if (addr) {
      const results = searchCustomersByAddress(addr);
      if (results.length === 1) setConfirmTarget(results[0]);
      else if (results.length > 1) setMultiResults(results);
      else {
        setCreatePrefill({ phone: '', address: addr });
        pushScreen('createCustomer');
      }
    }
  };

  const confirmCustomerAndOpenInvoice = () => {
    setActiveCustomer(confirmTarget);
    setConfirmTarget(null);
    setInvoiceNotes('');
    setPaymentType('cash'); // brand-new invoice defaults to Cash
    setReopenedInvoice(null); // this is a brand-new invoice, not a reopened one
    pushScreen('invoice');
  };
  const cancelConfirm = () => setConfirmTarget(null);
  const selectFromMulti = (c) => { setMultiResults(null); setConfirmTarget(c); };
  const createCustomerAndOpenInvoice = (c) => {
    setCreatePrefill(null);
    setActiveCustomer(c);
    setInvoiceNotes('');
    setPaymentType('cash'); // brand-new invoice defaults to Cash
    setReopenedInvoice(null); // brand-new invoice
    pushScreen('invoice');
  };
  const cancelCreate = () => { setCreatePrefill(null); goBack(); };

  // Alt+I: jump straight into an existing invoice, bypassing the customer
  // search flow entirely. Pulls the customer + notes from the mock record so
  // renderInvoice can show real data instead of an empty "0 items" shell.
  const reopenInvoice = (inv) => {
    const cust = customerForInvoice(inv);
    setActiveCustomer(cust);
    setInvoiceNotes(inv.notes || '');
    setInvoiceOperator(inv.operator || '');
    setPaymentType(inv.paymentType || 'cash');
    setReopenedInvoice(inv);
    setInvoiceLookupOpen(false);
    setNavStack(['home', 'salesperson', 'invoice']); // direct jump, breadcrumb stays sensible
  };

  // Alt+I with Modify mode armed (press M in the lookup): jump straight into
  // the Invoice Modification detail view for the chosen invoice. There is no
  // menu path to this screen any more — the lookup popup is the only door.
  const modifyInvoiceFromLookup = (inv) => {
    setModifyInvoice(inv);
    setInvoiceLookupOpen(false);
    setNavStack(['home', 'invoiceModifyDetail']);
  };

  // Star/unstar an invoice in the Alt+I "Saved" tab. Rolling list capped at
  // SAVED_INVOICES_MAX — saving one more silently drops the oldest, and the
  // returned notice string tells the operator exactly what happened.
  const toggleSavedInvoice = (inv) => {
    if (savedInvoices.some((s) => s.id === inv.id)) {
      setSavedInvoices(savedInvoices.filter((s) => s.id !== inv.id));
      return `${inv.id} removed from saved invoices.`;
    }
    if (savedInvoices.length >= SAVED_INVOICES_MAX) {
      const oldest = savedInvoices[0];
      setSavedInvoices([...savedInvoices.slice(1), inv]);
      return `Saved list full — ${oldest.id} (added first) was removed to make room for ${inv.id}.`;
    }
    setSavedInvoices([...savedInvoices, inv]);
    return `${inv.id} saved — press 2 in this popup to see it.`;
  };

  // Master keyboard router for logged-in screens. Popups manage their own keys,
  // so when one is open this handler steps aside. (Alt+B has its own effect above.)
  useEffect(() => {
    if (!isLoggedIn) return;
    const handleKey = (e) => {
      if (locked) return; // lock screen owns the keyboard entirely
      // Logout confirmation: intercept all keys while prompt is visible
      if (logoutPrompt) {
        if (e.key === 'Escape') { e.preventDefault(); setLogoutPrompt(false); return; }
        if (e.key === 'Enter')  { e.preventDefault(); handleLogout(); return; }
        return; // block everything else while prompt is open
      }

      if (anyPopupOpen) return;
      const tag = e.target && e.target.tagName;
      const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

      if (currentScreen === 'invoice') {
        // Modified F-keys must be checked before their plain counterparts.
        if (e.altKey && e.key === 'F11') { e.preventDefault(); setInvFeature('tape'); return; }
        if (e.altKey && e.key === 'F3')  { e.preventDefault(); setNotesOpen(true); return; }
        if (e.key === 'F2')  { e.preventDefault(); setInvFeature('modifyProduct'); return; }
        if (e.key === 'F3')  { e.preventDefault(); setInvFeature('orderDetail'); return; }
        if (e.key === 'F4')  { e.preventDefault(); setBrowseOpen(true); return; }
        if (e.key === 'F11') { e.preventDefault(); setInvFeature('productItems'); return; }
        // T and S are letters, so Option produces accented/dead-key output on
        // macOS (Option+T → †, Option+S → ß) — match e.code, same as B/C/I above.
        if (e.altKey && e.code === 'KeyT') { e.preventDefault(); setPaymentTypeOpen(true); return; }
        if (e.altKey && e.code === 'KeyS') { e.preventDefault(); setSalespersonOpen(true); return; }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        if (currentScreen === 'home') {
          // On the home screen Esc opens the logout prompt instead of navigating
          setLogoutPrompt(true);
        } else {
          goBack();
        }
        return;
      }

      if (typing || e.altKey || e.ctrlKey || e.metaKey) return;

      // Sales KPIs: 1–6 jump between tabs, D/W flip Delivered/Written —
      // matches the rest of the app's keyboard-first workflow.
      if (currentScreen === 'salesKpis') {
        const tabIdx = Number(e.key) - 1;
        if (tabIdx >= 0 && tabIdx < KPI_TABS.length && e.key === String(tabIdx + 1)) {
          e.preventDefault();
          setKpiTab(KPI_TABS[tabIdx].id);
          return;
        }
        if (e.code === 'KeyD') { e.preventDefault(); setKpiSalesType('delivered'); return; }
        if (e.code === 'KeyW') { e.preventDefault(); setKpiSalesType('written'); return; }
        return;
      }

      if (currentScreen === 'home') {
        const item = HOME_MENU.find((m) => m.key === e.key);
        if (item) handleHomeSelect(item.key);
      } else if (currentScreen === 'salesperson') {
        const item = SALESPERSON_MENU.find((m) => m.key === e.key || m.key === e.key.toUpperCase());
        if (item) handleSalespersonSelect(item.key);
      } else if (currentScreen === 'cashiers') {
        const item = CASHIERS_MENU.find((m) => m.key === e.key);
        if (item) handleCashiersSelect(item.key);
      } else if (currentScreen === 'inventory') {
        const item = INVENTORY_MENU.find((m) => m.key === e.key);
        if (item) handleInventorySelect(item.key);
      } else if (currentScreen === 'purchasing') {
        const item = PURCHASING_MENU.find((m) => m.key === e.key);
        if (item) handlePurchasingSelect(item.key);
      } else if (currentScreen === 'reports') {
        const item = REPORTS_MENU.find((m) => m.key === e.key);
        if (item) handleReportsSelect(item.key);
      } else if (currentScreen === 'otherProprietor') {
        const item = OTHER_PROPRIETOR_MENU.find((m) => m.key === e.key);
        if (item) handleOtherProprietorSelect(item.key);
      } else if (currentScreen === 'invoiceEnquiry') {
        const item = INVOICE_ENQUIRY_MENU.find((m) => m.key === e.key);
        if (item) handleInvoiceEnquirySelect(item.key);
      } else if (currentScreen === 'eod') {
        const item = EOD_MENU.find((m) => m.key === e.key);
        if (item) handleEodSelect(item.key);
      } else if (currentScreen === 'other') {
        // Numeric keys match directly; the letter shortcuts (P/H/R) match
        // case-insensitively so the operator needn't hold Shift.
        const item = OTHER_MENU.find((m) => m.key === e.key || m.key === e.key.toUpperCase());
        if (item) handleOtherSelect(item.key);
      } else if (currentScreen === 'purchaseRequest') {
        const item = PURCHASE_REQUEST_MENU.find((m) => m.key === e.key);
        if (item) handlePurchaseRequestSelect(item.key);
      } else if (currentScreen === 'sundriesMenu') {
        const item = SUNDRIES_MENU.find((m) => m.key === e.key);
        if (item) handleSundriesSelect(item.key);
      } else if (currentScreen === 'otherPosMenu') {
        const item = OTHER_POS_MENU.find((m) => m.key === e.key);
        if (item) handleOtherPosSelect(item.key);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isLoggedIn, currentScreen, anyPopupOpen, logoutPrompt, locked]);

  // Focus the operator field when the New Invoice search screen opens
  useEffect(() => {
    if (currentScreen === 'invoiceSearch') {
      const t = setTimeout(() => invoiceOperatorRef.current && invoiceOperatorRef.current.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [currentScreen]);

  // ---- Screen render helpers ----
  const breadcrumb = navStack.map((s) => SCREEN_LABELS[s] || s).join('  ›  ');

  const renderTopBar = () => (
    <header className="hn-topbar">
      <div className="hn-topbar-left">
        <div className="hn-amber-bar" style={{ width: '4px', height: '36px', borderRadius: '1px' }} />
        <div>
          <div className="hn-wordmark">Harvey Norman</div>
          <div className="hn-store-sub hn-serif">Hoppers Crossing <span className="hn-divider-dot" /> Vic 3029</div>
        </div>
      </div>
      <div className="hn-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="hn-pill-group">
          <span className="hn-pill-seg">
            <User2 size={13} strokeWidth={1.75} />
            <span style={{ color: 'var(--text-muted)' }}>OP</span>
            <span className="hn-mono" style={{ fontWeight: 600 }}>{operatorNumber}</span>
          </span>
          <span className="hn-pill-divider" />
          <span className="hn-pill-seg hn-mono" style={{ letterSpacing: '0.03em' }}><LiveClock /></span>
        </div>
        <button type="button" className="hn-btn-ghost hn-glass-accent" onClick={() => setBrowseOpen(true)} title="Alt + B">
          <Search size={13} strokeWidth={1.75} /> Browse
          <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.7, marginLeft: '4px' }}>⌥B</span>
        </button>
        <button type="button" className="hn-btn-ghost hn-glass-accent" onClick={() => setCustomerSearchOpen(true)} title="Alt + C">
          <UserRound size={13} strokeWidth={1.75} /> Customer
          <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.7, marginLeft: '4px' }}>⌥C</span>
        </button>
        <button type="button" className="hn-btn-ghost hn-glass-accent" onClick={() => setInvoiceLookupOpen(true)} title="Alt + I">
          <FileText size={13} strokeWidth={1.75} /> Invoice
          <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.7, marginLeft: '4px' }}>⌥I</span>
        </button>
        <button type="button" className="hn-btn-ghost hn-glass-accent" onClick={() => setProductGroupsOpen(true)} title="Alt + G">
          <ClipboardList size={13} strokeWidth={1.75} /> Groups
          <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.7, marginLeft: '4px' }}>⌥G</span>
        </button>
        <button type="button" className="hn-btn-ghost hn-glass-accent" onClick={() => setCalcOpen((v) => !v)} title="Alt + K">
          <Calculator size={13} strokeWidth={1.75} /> Calc
          <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.7, marginLeft: '4px' }}>⌥K</span>
        </button>
        <button type="button" className="hn-btn-ghost hn-glass-accent" onClick={() => setPadOpen((v) => !v)} title="Alt + N">
          <StickyNote size={13} strokeWidth={1.75} /> Notes
          <span className="hn-mono" style={{ fontSize: '10px', opacity: 0.7, marginLeft: '4px' }}>⌥N</span>
        </button>
        <button
          type="button"
          className="hn-btn-ghost"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <Moon size={13} strokeWidth={1.75} /> : <Sun size={13} strokeWidth={1.75} />}
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <button type="button" className="hn-btn-ghost" onClick={lockNow} title="Lock the terminal now">
          <LockKeyhole size={13} strokeWidth={1.75} /> Lock
        </button>
        <button type="button" className="hn-btn-ghost" onClick={handleLogout}>
          <LogOut size={13} strokeWidth={1.75} /> Log out
        </button>
      </div>
    </header>
  );

  // The blue contextual sidebar. Shows the items for the current menu level;
  // icons appear on the main menu only. A Back row appears on sub-menus.
  const renderSidebar = () => {
    const cfg = MENU_CONFIG[sidebarScreen];
    const withIcons = !!cfg.icons;
    const prevScreen = navStack.length > 1 ? navStack[navStack.length - 2] : null;
    const backLabel = prevScreen ? SCREEN_LABELS[prevScreen] || 'previous menu' : '';
    return (
      <aside className="hn-sidebar">
        <nav className="hn-sidebar-nav hn-stagger" key={sidebarScreen}>
          {cfg.items.map((item) => {
            const Icon = withIcons ? cfg.icons[item.key] : null;
            const active = sidebarActiveKey === item.key;
            // "Undelivered Sales" personalises to the logged-in operator, e.g.
            // "Undelivered Sales for Mikael" (matches the live terminal).
            let label = item.label;
            if (sidebarScreen === 'salesperson' && item.key === '4') {
              const nm = OPERATOR_NAMES[operatorNumber];
              label = nm ? `Undelivered Sales for ${nm.split(' ')[0]}` : 'Undelivered Sales';
            }
            return (
              <button
                type="button"
                key={item.key}
                className={`hn-side-item ${active ? 'active' : ''} ${withIcons ? 'has-icon' : ''}`}
                onClick={() => selectSidebarItem(item.key)}
              >
                <span className="hn-side-num">{item.key}</span>
                {Icon && (
                  <span className="hn-side-icon">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                )}
                <span className="hn-side-label">{label}</span>
                <ChevronRight size={16} className="hn-side-chev" strokeWidth={2} />
              </button>
            );
          })}
        </nav>
        {sidebarScreen !== 'home' && (
          <button type="button" className="hn-side-back" onClick={goBack}>
            <span className="hn-side-back-key">Esc</span>
            <span className="hn-side-label">Back to {backLabel}</span>
          </button>
        )}
      </aside>
    );
  };

  // The right-hand content pane shown alongside a menu sidebar.
  const renderMenuContent = (eyebrow, instruction) => (
    <main className="hn-content" key={`${sidebarScreen}-content`}>
      <div className="hn-content-head hn-fade-in">
        <div className="hn-eyebrow">{eyebrow}</div>
        <h1 className="hn-serif hn-content-title">{sidebarScreen === 'home' ? operatorGreeting() : 'Select an option'}</h1>
        <span className="hn-title-rule" />
        <p className="hn-content-sub">{instruction}</p>
      </div>

      <div className="hn-terminal-panel">
        <div>
          <div className="hn-eyebrow hn-terminal-eyebrow">Terminal information</div>
          <div className="hn-mono hn-terminal-line">
            Terminal <span className="hn-divider-dot" /> HOPPERS CROSSING <span className="hn-divider-dot" /> v1.0.1
          </div>
        </div>
        <div className="hn-terminal-date">
          <Calendar size={15} strokeWidth={1.75} />
          <LiveClock type="date" />
        </div>
      </div>
    </main>
  );

  // ---- Online Orders screen ----
  const onlineOrdersFiltered = MOCK_ONLINE_ORDERS.filter((o) => {
    const q = onlineOrderQuery.trim().toLowerCase();
    const matchesQuery = !q
      || o.orderNo.toLowerCase().includes(q)
      || o.name.toLowerCase().includes(q)
      || (o.salesOrderNo && o.salesOrderNo.toLowerCase().includes(q));
    const matchesDispatch = onlineOrderDispatch === 'all' || o.dispatch === onlineOrderDispatch;
    return matchesQuery && matchesDispatch;
  });

  const fmtMoney = (n) => n.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const renderOnlineOrders = () => {
    const selected = MOCK_ONLINE_ORDERS.find((o) => o.orderNo === onlineOrderSel) || null;
    const hasDetail = selected && selected.salesOrderNo; // only the Beattie order is fully mocked
    const ordersTotal = onlineOrdersFiltered.reduce((sum, o) => sum + o.total, 0);

    const statusClass = (s) =>
      s === 'Completed' ? 'completed' : s === 'New' ? 'new' : 'pending';

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
            <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Online Orders</h1>
          </div>
          <div className="hn-oo-summary">
            <span className="hn-detail-label">Sales Orders</span>
            <span className="hn-oo-summary-value hn-mono">${fmtMoney(ordersTotal)}</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="hn-oo-filterbar hn-fade-in">
          <div className="hn-oo-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              className="hn-oo-search-input hn-mono"
              placeholder="Search order #, invoice # or customer name…"
              value={onlineOrderQuery}
              onChange={(e) => setOnlineOrderQuery(e.target.value)}
            />
          </div>
          <div className="hn-oo-segmented">
            {[['all', 'All'], ['Delivery', 'Delivery'], ['Pick up', 'Pick up']].map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`hn-oo-seg ${onlineOrderDispatch === id ? 'active' : ''}`}
                onClick={() => setOnlineOrderDispatch(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Master / detail */}
        <div className="hn-oo-layout hn-fade-in">

          {/* LEFT — orders table */}
          <div className="hn-oo-list">
            <div className="hn-oo-list-head">
              <span className="hn-oo-col-status">Status</span>
              <span className="hn-oo-col-order">Order #</span>
              <span className="hn-oo-col-date">Date</span>
              <span className="hn-oo-col-total">Total</span>
              <span className="hn-oo-col-name">Name</span>
              <span className="hn-oo-col-dispatch">Dispatch</span>
            </div>
            <div className="hn-oo-list-body">
              {onlineOrdersFiltered.map((o) => (
                <button
                  key={o.orderNo}
                  type="button"
                  className={`hn-oo-row ${onlineOrderSel === o.orderNo ? 'active' : ''}`}
                  onClick={() => setOnlineOrderSel(o.orderNo)}
                >
                  <span className="hn-oo-col-status">
                    <span className={`hn-oo-badge ${statusClass(o.status)}`}>{o.status}</span>
                  </span>
                  <span className="hn-oo-col-order hn-mono">{o.orderNo}</span>
                  <span className="hn-oo-col-date hn-mono">{o.date}</span>
                  <span className="hn-oo-col-total hn-mono">{fmtMoney(o.total)}</span>
                  <span className="hn-oo-col-name">{o.name}</span>
                  <span className="hn-oo-col-dispatch">
                    <span className={`hn-oo-dispatch ${o.dispatch === 'Delivery' ? 'delivery' : 'pickup'}`}>{o.dispatch}</span>
                  </span>
                </button>
              ))}
              {onlineOrdersFiltered.length === 0 && (
                <div className="hn-oo-empty">No orders match your search.</div>
              )}
            </div>
          </div>

          {/* RIGHT — detail pane */}
          <div className="hn-oo-detail">
            {!selected ? (
              <div className="hn-oo-detail-empty">Select an order to view its details.</div>
            ) : !hasDetail ? (
              <div className="hn-oo-detail-empty">
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{selected.name}</div>
                <div className="hn-mono" style={{ fontSize: '12px' }}>{selected.orderNo}</div>
                <div style={{ marginTop: '10px', fontSize: '12.5px' }}>
                  Full order detail isn't mocked for this row yet — select Beattie, Peter (31003992413) to see the complete layout.
                </div>
              </div>
            ) : (
              <>
                {/* Sales Order Information */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Sales Order Information</div>
                  <div className="hn-oo-info-grid">
                    <div><span className="hn-detail-label">Status</span><span className="hn-oo-info-val"><span className="hn-oo-badge completed">{selected.status}</span></span></div>
                    <div><span className="hn-detail-label">Order Created</span><span className="hn-oo-info-val hn-mono">{selected.orderCreated}</span></div>
                    <div><span className="hn-detail-label">Online Order #</span><span className="hn-oo-info-val hn-mono">{selected.orderNo}</span></div>
                    <div><span className="hn-detail-label">Added in POS</span><span className="hn-oo-info-val hn-mono">{selected.addedInPos}</span></div>
                    <div><span className="hn-detail-label">Sales Order #</span><span className="hn-oo-info-val hn-mono">{selected.salesOrderNo}</span></div>
                    <div><span className="hn-detail-label">Payment Type</span><span className="hn-oo-info-val">{selected.paymentType}</span></div>
                    <div><span className="hn-detail-label">Salesperson</span><span className="hn-oo-info-val hn-mono">{selected.salesperson}</span></div>
                    <div><span className="hn-detail-label">Total Delivery</span><span className="hn-oo-info-val hn-mono">${fmtMoney(selected.totalDelivery)}</span></div>
                    <div><span className="hn-detail-label">Ship Option</span><span className="hn-oo-info-val">{selected.shipOption}</span></div>
                    <div><span className="hn-detail-label">Ship Ref #</span><span className="hn-oo-info-val hn-mono">{selected.shipRef}</span></div>
                    <div><span className="hn-detail-label">Split</span><span className="hn-oo-info-val">{selected.split}</span></div>
                    <div><span className="hn-detail-label">Address Validated</span><span className="hn-oo-info-val">{selected.addressValidated}</span></div>
                  </div>
                </div>

                {/* Billing + Delivery */}
                <div className="hn-oo-two-col">
                  <div className="hn-oo-card">
                    <div className="hn-oo-card-head">Billing Customer</div>
                    <div className="hn-oo-stack">
                      <div className="hn-oo-name">{selected.billing.name}</div>
                      <div className="hn-mono" style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{selected.billing.phone}</div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{selected.billing.email}</div>
                    </div>
                  </div>
                  <div className="hn-oo-card">
                    <div className="hn-oo-card-head">Delivery</div>
                    <div className="hn-oo-stack">
                      <div className="hn-oo-name">{selected.delivery.name}</div>
                      <div className="hn-mono" style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{selected.delivery.phone}</div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{selected.delivery.address}</div>
                    </div>
                  </div>
                </div>

                {/* Notes + Progress */}
                <div className="hn-oo-two-col">
                  <div className="hn-oo-card">
                    <div className="hn-oo-card-head">Sales Order Notes</div>
                    <div className="hn-oo-notes">{selected.notes || '—'}</div>
                  </div>
                  <div className="hn-oo-card">
                    <div className="hn-oo-card-head">Sales Order Progress</div>
                    <div className="hn-oo-progress">
                      {selected.progress.map((p, i) => (
                        <div key={i} className="hn-oo-progress-row">
                          <div className="hn-oo-progress-when hn-mono">{p.when} · {p.op}</div>
                          <div className="hn-oo-progress-text">{p.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stock + Item info */}
                <div className="hn-oo-two-col">
                  <div className="hn-oo-card">
                    <div className="hn-oo-card-head">Product Quantity / Shipping</div>
                    <div className="hn-oo-ledger">
                      <div><span>Physical Stock On Hand</span><span className="hn-mono">{selected.stock.physicalSOH}.00</span></div>
                      <div><span>Qty Not Available for Sale</span><span className="hn-mono">{selected.stock.qtyNotAvailable}.00</span></div>
                      <div><span>Stock on Sales Order</span><span className="hn-mono">{selected.stock.stockOnSalesOrder}.00</span></div>
                      <div><span>Online Orders Not Generated</span><span className="hn-mono">{selected.stock.notGenerated}.00</span></div>
                      <div className="hn-oo-ledger-strong"><span>Available in Store</span><span className="hn-mono">{selected.stock.availableInStore}.00</span></div>
                      <div><span>Stock on Purchase Order</span><span className="hn-mono">{selected.stock.stockOnPO}.00</span></div>
                      <div className="hn-oo-ledger-strong"><span>Total Available For Sale</span><span className="hn-mono">{selected.stock.totalAvailable}.00</span></div>
                    </div>
                    <div className="hn-oo-dims hn-mono">{selected.stock.dims}</div>
                  </div>
                  <div className="hn-oo-card">
                    <div className="hn-oo-card-head">Sales Order Item Information</div>
                    <div className="hn-oo-stack" style={{ fontSize: '12.5px', color: 'var(--text-muted)', gap: '5px' }}>
                      <div>Delivery: <span className="hn-mono" style={{ color: 'var(--text)' }}>${fmtMoney(selected.totalDelivery)}</span></div>
                      <div>Dispatch: Courier from Warehouse</div>
                      <div>Shipping Option: {selected.shipOption}</div>
                      <div>Shipping Ref: <span className="hn-mono">{selected.shipRef}</span></div>
                      <div>Shipping Days: 1 business day</div>
                      <div>Tax Invoice: <span className="hn-mono">{selected.salesOrderNo}</span> · Movex: L3M</div>
                    </div>
                  </div>
                </div>

                {/* Items table */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Order Items</div>
                  <div className="hn-oo-items">
                    <div className="hn-oo-items-head">
                      <span>Product</span><span>Description</span><span style={{ textAlign: 'right' }}>Qty</span>
                      <span style={{ textAlign: 'right' }}>Price</span><span style={{ textAlign: 'right' }}>Total</span><span>Status</span>
                    </div>
                    {selected.items.map((it, i) => (
                      <div key={i} className="hn-oo-items-row">
                        <span className="hn-mono">{it.product}</span>
                        <span>{it.description}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{it.qty}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{fmtMoney(it.price)}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{fmtMoney(it.total)}</span>
                        <span><span className="hn-oo-badge pending">{it.status}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Other</span>
          <span>{onlineOrdersFiltered.length} order{onlineOrdersFiltered.length !== 1 ? 's' : ''} shown</span>
        </div>
      </main>
    );
  };

  // ---- Undelivered Sales screen ----
  const undeliveredFiltered = MOCK_UNDELIVERED.filter((u) => {
    const q = undeliveredQuery.trim().toLowerCase();
    if (!q) return true;
    return u.invoiceNo.toLowerCase().includes(q)
      || u.customer.toLowerCase().includes(q)
      || u.phone.toLowerCase().includes(q);
  });

  const renderUndeliveredSales = () => {
    const selected = MOCK_UNDELIVERED.find((u) => u.invoiceNo === undeliveredSel) || null;
    const PROCESS_ACTIONS = ['Open Invoice', 'Modify Invoice', 'Cancel Invoice', 'Uncancel Invoice', 'Reprint Invoice', 'Approve Invoice'];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Undelivered Sales</h1>
        </div>

        {/* Filter + process bar */}
        <div className="hn-us-toolbar hn-fade-in">
          <div className="hn-us-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              className="hn-us-search-input hn-mono"
              placeholder="Filter by invoice #, customer or phone…"
              value={undeliveredQuery}
              onChange={(e) => setUndeliveredQuery(e.target.value)}
            />
          </div>
          <div className="hn-us-actions">
            {PROCESS_ACTIONS.map((a) => (
              <button key={a} type="button" className="hn-us-action-btn">{a}</button>
            ))}
          </div>
        </div>

        {/* Master / detail */}
        <div className="hn-us-layout hn-fade-in">

          {/* LEFT column — invoices + products */}
          <div className="hn-us-main">
            <div className="hn-us-card">
              <div className="hn-oo-card-head">Undelivered Invoices</div>
              <div className="hn-us-invoices">
                <div className="hn-us-inv-head">
                  <span>Sales Person</span><span>Invoice #</span><span>Customer</span>
                  <span>Phone</span><span>Status</span><span>Inv. Date</span><span>Expected</span>
                </div>
                <div className="hn-us-inv-body">
                  {undeliveredFiltered.map((u) => (
                    <button
                      key={u.invoiceNo}
                      type="button"
                      className={`hn-us-inv-row ${undeliveredSel === u.invoiceNo ? 'active' : ''}`}
                      onClick={() => setUndeliveredSel(u.invoiceNo)}
                    >
                      <span className="hn-mono">{u.salesPerson}</span>
                      <span className="hn-mono">{u.invoiceNo}</span>
                      <span className="hn-us-ellip">{u.customer}</span>
                      <span className="hn-mono">{u.phone}</span>
                      <span>
                        <span className={`hn-oo-dispatch ${u.status === 'Pickup Pending' ? 'pickup' : 'delivery'}`}>{u.status}</span>
                      </span>
                      <span className="hn-mono">{u.invoiceDate}</span>
                      <span className="hn-mono">{u.customerExpected}</span>
                    </button>
                  ))}
                  {undeliveredFiltered.length === 0 && (
                    <div className="hn-oo-empty">No undelivered invoices match your filter.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Products on invoice */}
            <div className="hn-us-card">
              <div className="hn-oo-card-head">Products on Invoice</div>
              {selected && selected.products.length > 0 ? (
                <div className="hn-us-products">
                  <div className="hn-us-prod-head">
                    <span>Line</span><span>Dept</span><span>Product</span><span>Description</span>
                    <span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>SOH</span>
                    <span style={{ textAlign: 'right' }}>AVL</span><span style={{ textAlign: 'right' }}>SOO</span>
                    <span style={{ textAlign: 'right' }}>Sell Price</span><span>Type</span>
                  </div>
                  <div className="hn-us-prod-body">
                    {selected.products.map((p) => (
                      <div key={p.line} className="hn-us-prod-row">
                        <span className="hn-mono">{p.line}</span>
                        <span className="hn-mono">{p.dept}</span>
                        <span className="hn-mono">{p.product}</span>
                        <span className="hn-us-ellip">{p.description}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{p.qty}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{p.soh}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{p.avl}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{p.soo}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(p.sellPrice)}</span>
                        <span>{p.type === 'Delivered'
                          ? <span className="hn-oo-badge completed">Delivered</span>
                          : <span className="hn-us-type">{p.type}</span>}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="hn-oo-empty" style={{ padding: '24px' }}>
                  {selected ? 'No product lines mocked for this invoice yet.' : 'Select an invoice to view its products.'}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT column — notes + actions */}
          <div className="hn-us-side">
            <div className="hn-us-card">
              <div className="hn-oo-card-head">Invoice Notes</div>
              <div className="hn-oo-notes" style={{ minHeight: '60px' }}>
                {selected && selected.invoiceNotes ? selected.invoiceNotes : 'No invoice notes.'}
              </div>
            </div>

            <div className="hn-us-card">
              <div className="hn-oo-card-head">Progress Notes</div>
              <div className="hn-oo-progress">
                {selected && selected.progressNotes.length > 0 ? (
                  selected.progressNotes.map((p, i) => (
                    <div key={i} className="hn-oo-progress-row">
                      <div className="hn-oo-progress-when hn-mono">
                        <span className="hn-us-initials">{p.initials}</span> {p.when} · {p.op}
                      </div>
                      <div className="hn-oo-progress-text">{p.text}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>No progress notes yet.</div>
                )}
              </div>
            </div>

            {selected && selected.productNote && (
              <div className="hn-us-card">
                <div className="hn-oo-card-head">Product Notes</div>
                <div className="hn-oo-notes">{selected.productNote}</div>
              </div>
            )}

            <div className="hn-us-card hn-us-actions-card">
              <div className="hn-oo-card-head">Actions</div>
              <div className="hn-us-action-list">
                <div className="hn-us-action-strong">Ensure goods are delivered before Scan at Risk Date.</div>
                <div style={{ color: 'var(--success)', fontWeight: 600 }}>Product is In Stock.</div>
                <ol className="hn-us-action-steps">
                  <li>Speak to the Customer to find out if they still require the Product.</li>
                  <li>Use the Dispatch Delivery hotkey to update the Pickup/Delivery Date.</li>
                  <li>If the Customer does not want the product, Cancel Customer Invoice.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Other</span>
          <span>{undeliveredFiltered.length} undelivered invoice{undeliveredFiltered.length !== 1 ? 's' : ''}</span>
        </div>
      </main>
    );
  };

  // ---- Customer Service Tickets screen ----
  const cstFiltered = MOCK_CS_TICKETS.filter((t) => {
    const q = cstQuery.trim().toLowerCase();
    if (!q) return true;
    return t.ticketNo.toLowerCase().includes(q)
      || t.subject.toLowerCase().includes(q)
      || t.productName.toLowerCase().includes(q)
      || t.customer.name.toLowerCase().includes(q)
      || t.assignedTo.toLowerCase().includes(q);
  });

  const cstStateClass = (s) =>
    s === 'Critical' ? 'critical'
    : s === 'In Progress' ? 'inprogress'
    : s === 'Follow Up' ? 'followup'
    : 'default';

  const renderCustomerServiceTickets = () => {
    const selected = MOCK_CS_TICKETS.find((t) => t.ticketNo === cstSel) || null;

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Customer Service Tickets</h1>
        </div>

        {/* Filter + process bar */}
        <div className="hn-cst-toolbar hn-fade-in">
          <div className="hn-cst-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              className="hn-cst-search-input hn-mono"
              placeholder="Filter by ticket #, subject, product or customer…"
              value={cstQuery}
              onChange={(e) => setCstQuery(e.target.value)}
            />
          </div>
          <label className="hn-cst-checkbox">
            <input type="checkbox" checked={cstCurrentUser} onChange={(e) => setCstCurrentUser(e.target.checked)} />
            <span>Current User</span>
          </label>
          <div style={{ flex: 1 }} />
          <button
            type="button"
            className="hn-btn-ghost"
            onClick={() => selected && setCstOpenTicket(selected.ticketNo)}
            disabled={!selected}
          >
            <FileText size={13} strokeWidth={1.75} /> Open Ticket
          </button>
          <button type="button" className="hn-btn-primary hn-cst-add-btn" onClick={() => setCstNewTicketOpen(true)}>
            + Add New Ticket
          </button>
        </div>

        {/* Master / detail */}
        <div className="hn-cst-layout hn-fade-in">

          {/* LEFT — tickets list */}
          <div className="hn-cst-list">
            {cstFiltered.map((t) => {
              const active = cstSel === t.ticketNo;
              return (
                <button
                  key={t.ticketNo}
                  type="button"
                  className={`hn-cst-card ${active ? 'active' : ''}`}
                  onClick={() => setCstSel(t.ticketNo)}
                  onDoubleClick={() => setCstOpenTicket(t.ticketNo)}
                >
                  <div className="hn-cst-card-left">
                    <span className={`hn-cst-state ${cstStateClass(t.state)}`}>{t.state}</span>
                    <span className="hn-cst-ticketno">
                      <span className="hn-cst-ticketno-label">Ticket</span>
                      <span className="hn-mono">{t.ticketNo}</span>
                    </span>
                  </div>
                  <div className="hn-cst-card-mid">
                    <div className="hn-cst-subject">{t.subject}</div>
                    <div className="hn-cst-source">
                      {t.source === 'Phone' ? '📞' : '🏬'} {t.source}
                    </div>
                    <div className="hn-cst-raised hn-mono">Raised {t.raised} by {t.raisedBy}</div>
                    <div className="hn-cst-lastcontact hn-mono">Last contact {t.lastContact}</div>
                  </div>
                  <div className="hn-cst-card-meta">
                    <div className="hn-mono hn-cst-inv">
                      {t.altInvoice ? 'ALT INV# ' : 'INV# '}{t.invoiceNo}
                      {t.trn && <span className="hn-cst-trn"> · TRN# {t.trn}</span>}
                    </div>
                    <div className="hn-cst-prod">{t.productCode} · {t.productName}</div>
                    <div className="hn-cst-age hn-mono">Ticket Age: {t.ticketAge} days</div>
                  </div>
                  <div className="hn-cst-card-flags">
                    <span className="hn-cst-flag priority">◆ {t.priority}</span>
                    <span className="hn-cst-flag faulty">△ {t.type}</span>
                    <span className="hn-cst-flag status">▣ {t.status}</span>
                    <span className="hn-cst-assigned hn-mono">{t.assignedTo}</span>
                  </div>
                </button>
              );
            })}
            {cstFiltered.length === 0 && (
              <div className="hn-oo-empty">No tickets match your filter.</div>
            )}
          </div>

          {/* RIGHT — detail pane */}
          <div className="hn-cst-detail">
            {!selected ? (
              <div className="hn-oo-detail-empty">Select a ticket to view its details.</div>
            ) : (
              <>
                {/* Ticket header */}
                <div className="hn-oo-card">
                  <div className="hn-cst-detail-head">
                    <div>
                      <span className="hn-cst-detail-ticketlabel">Ticket #</span>
                      <span className="hn-serif hn-cst-detail-ticketno">{selected.ticketNo}</span>
                    </div>
                    <span className={`hn-cst-state ${cstStateClass(selected.state)}`}>{selected.state}</span>
                  </div>
                  <div className="hn-cst-detail-subject">
                    <div><span className="hn-detail-label">Subject</span><span className="hn-cst-subject-val">{selected.subject}</span></div>
                    <div><span className="hn-detail-label">Description</span><span className="hn-cst-desc-val">{selected.description}</span></div>
                  </div>
                </div>

                {/* Customer Summary */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Customer Summary</div>
                  <div className="hn-cst-cust">
                    <div className="hn-oo-name">{selected.customer.name}</div>
                    <div className="hn-cst-cust-grid">
                      <div style={{ whiteSpace: 'pre-line', fontSize: '12.5px', color: 'var(--text-muted)' }}>{selected.customer.address}</div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                        <div>Mobile: <span className="hn-mono" style={{ color: 'var(--text)' }}>{selected.customer.mobile}</span></div>
                        <div style={{ wordBreak: 'break-all' }}>Email: <span style={{ color: 'var(--text)' }}>{selected.customer.email}</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Ticket Details</div>
                  <div className="hn-cst-details-grid">
                    <div><span className="hn-detail-label">State</span><span className="hn-cst-dv">{selected.state}</span></div>
                    <div><span className="hn-detail-label">Priority</span><span className="hn-cst-dv">{selected.priority}</span></div>
                    <div><span className="hn-detail-label">Ticket Raised</span><span className="hn-cst-dv hn-mono">{selected.raised}</span></div>
                    <div><span className="hn-detail-label">Type</span><span className="hn-cst-dv">{selected.type}</span></div>
                    <div><span className="hn-detail-label">Status</span><span className="hn-cst-dv">{selected.status}</span></div>
                    <div><span className="hn-detail-label">Last Update</span><span className="hn-cst-dv hn-mono">{selected.lastUpdate}</span></div>
                    <div><span className="hn-detail-label">Franchise</span><span className="hn-cst-dv hn-mono">{selected.franchise}</span></div>
                    <div><span className="hn-detail-label">Sales Person</span><span className="hn-cst-dv hn-mono">{selected.salesPerson}</span></div>
                    <div><span className="hn-detail-label">Resolved</span><span className="hn-cst-dv">{selected.resolved || '—'}</span></div>
                  </div>
                </div>

                {/* Product */}
                <div className="hn-oo-card">
                  <div className="hn-cst-prod-head">
                    <span>Product</span>
                    <button type="button" className="hn-cst-link">Supplier Contacts</button>
                  </div>
                  <div className="hn-cst-prod-body">
                    <div className="hn-cst-prod-col">
                      <div className="hn-mono" style={{ fontWeight: 600, marginBottom: '6px' }}>{selected.dept} {selected.productCode}  {selected.productName}</div>
                      <div className="hn-cst-prodline">Qty: <span className="hn-mono">{selected.qty}.00</span> · Booked Out: <span className="hn-mono">{selected.product.bookedOut}</span> {selected.product.bookedAgo && <span style={{ color: 'var(--text-faint)' }}>({selected.product.bookedAgo})</span>}</div>
                      <div className="hn-cst-prodline">Brand: {selected.product.brand}</div>
                      <div className="hn-cst-prodline">Group: <span className="hn-mono">{selected.product.group}</span></div>
                      <div className="hn-cst-prodline">Supplier: {selected.product.supplier}</div>
                      <div className="hn-cst-prodline hn-mono" style={{ fontSize: '11.5px' }}>P: {selected.product.supplierPhone}  F: {selected.product.supplierFax}</div>
                    </div>
                    <div className="hn-cst-prod-col">
                      <div className="hn-cst-prodline">Fault Type: {selected.product.faultType}</div>
                      <div className="hn-cst-prodline">Installed: {selected.product.installed}</div>
                      <div className="hn-cst-prodline">Serial: <span className="hn-mono">{selected.product.serial}</span></div>
                      <div className="hn-cst-prodline">Location: {selected.product.location}</div>
                      <div className="hn-cst-prodline">Condition: {selected.product.condition}</div>
                      <div className="hn-cst-prodline">Fault Observed: {selected.product.faultObserved}</div>
                    </div>
                  </div>
                </div>

                {/* History Log */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">History Log</div>
                  <div className="hn-cst-history">
                    {selected.history.map((h, i) => (
                      <div key={i} className="hn-cst-history-row hn-mono">{h}</div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Other</span>
          <span>{cstFiltered.length} ticket{cstFiltered.length !== 1 ? 's' : ''} shown</span>
        </div>
      </main>
    );
  };

  // ---- Quotations screen ----
  const quotesFiltered = MOCK_QUOTATIONS.filter((q) => {
    const text = quoteQuery.trim().toLowerCase();
    const matchesText = !text
      || q.quotationNo.toLowerCase().includes(text)
      || q.customer.toLowerCase().includes(text)
      || q.salesPerson.toLowerCase().includes(text);
    const matchesStatus =
      quoteStatusFilter === 'All' ? true
      : quoteStatusFilter === 'All Open' ? q.status !== 'Cancelled'
      : q.status === quoteStatusFilter;
    return matchesText && matchesStatus;
  });

  // Summary tallies by status (mirrors the top-left summary box).
  const quoteSummary = (() => {
    const sum = { Active: { qty: 0, value: 0 }, Renewed: { qty: 0, value: 0 }, Expired: { qty: 0, value: 0 } };
    MOCK_QUOTATIONS.forEach((q) => {
      if (sum[q.status]) { sum[q.status].qty += 1; sum[q.status].value += q.total; }
    });
    const total = { qty: MOCK_QUOTATIONS.length, value: MOCK_QUOTATIONS.reduce((s, q) => s + q.total, 0) };
    return { ...sum, Total: total };
  })();

  const quoteStatusClass = (s) =>
    s === 'Active' ? 'completed' : s === 'Expired' ? 'expired' : s === 'Renewed' ? 'new' : 'pending';

  const renderQuotations = () => {
    const selected = MOCK_QUOTATIONS.find((q) => q.quotationNo === quoteSel) || null;
    const QUOTE_FILTERS = ['All Open', 'Active', 'Renewed', 'Expired', 'All'];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Quotations</h1>
        </div>

        {/* Summary tallies */}
        <div className="hn-qt-summary hn-fade-in">
          {['Active', 'Renewed', 'Expired', 'Total'].map((k) => (
            <div key={k} className={`hn-qt-summary-cell ${k === 'Total' ? 'total' : ''}`}>
              <span className="hn-qt-summary-label">{k}</span>
              <span className="hn-qt-summary-qty hn-mono">{quoteSummary[k].qty}</span>
              <span className="hn-qt-summary-value hn-mono">${fmtMoney(quoteSummary[k].value)}</span>
            </div>
          ))}
        </div>

        {/* Filter + process bar */}
        <div className="hn-qt-toolbar hn-fade-in">
          <div className="hn-qt-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              className="hn-qt-search-input hn-mono"
              placeholder="Filter by quotation #, customer or salesperson…"
              value={quoteQuery}
              onChange={(e) => setQuoteQuery(e.target.value)}
            />
          </div>
          <div className="hn-oo-segmented">
            {QUOTE_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`hn-oo-seg ${quoteStatusFilter === f ? 'active' : ''}`}
                onClick={() => setQuoteStatusFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="hn-cst-checkbox">
            <input type="checkbox" checked={quoteCurrentUser} onChange={(e) => setQuoteCurrentUser(e.target.checked)} />
            <span>Current User</span>
          </label>
          <div style={{ flex: 1 }} />
          <button type="button" className="hn-btn-ghost">Generate Invoice</button>
          <button type="button" className="hn-btn-primary hn-cst-add-btn">+ Add New Quotation</button>
        </div>

        {/* Master / detail */}
        <div className="hn-qt-layout hn-fade-in">
          <div className="hn-qt-main">

            {/* Quotations list */}
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Quotations</div>
              <div className="hn-qt-list">
                <div className="hn-qt-list-head">
                  <span>Status</span><span>Sales Person</span><span>Quotation #</span>
                  <span>Created</span><span>Expiry</span><span>Customer</span>
                  <span>Follow Up</span><span style={{ textAlign: 'right' }}>Total</span>
                </div>
                <div className="hn-qt-list-body">
                  {quotesFiltered.map((q) => (
                    <button
                      key={q.quotationNo}
                      type="button"
                      className={`hn-qt-row ${quoteSel === q.quotationNo ? 'active' : ''}`}
                      onClick={() => setQuoteSel(q.quotationNo)}
                    >
                      <span><span className={`hn-oo-badge ${quoteStatusClass(q.status)}`}>{q.status}</span></span>
                      <span className="hn-mono">{q.salesPerson}</span>
                      <span className="hn-mono">{q.quotationNo}</span>
                      <span className="hn-mono">{q.created}</span>
                      <span className="hn-mono">{q.expiry}</span>
                      <span className="hn-qt-ellip">{q.customer}</span>
                      <span>{q.followUp}</span>
                      <span className="hn-mono" style={{ textAlign: 'right', fontWeight: 600 }}>${fmtMoney(q.total)}</span>
                    </button>
                  ))}
                  {quotesFiltered.length === 0 && (
                    <div className="hn-oo-empty">No quotations match your filter.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Products on quotation */}
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Products on Quotation</div>
              {selected && selected.products.length > 0 ? (
                <div className="hn-qt-products">
                  <div className="hn-qt-prod-head">
                    <span>Line</span><span>Product</span><span>Description</span>
                    <span style={{ textAlign: 'right' }}>Qty</span>
                    <span style={{ textAlign: 'right' }}>Retail</span>
                    <span style={{ textAlign: 'right' }}>Disc.</span>
                    <span>Type</span>
                    <span style={{ textAlign: 'right' }}>Quoted</span>
                    <span style={{ textAlign: 'right' }}>Total</span>
                    <span>Expires</span>
                    <span style={{ textAlign: 'right' }}>Current</span>
                  </div>
                  <div className="hn-qt-prod-body">
                    {selected.products.map((p) => (
                      <div key={p.line} className="hn-qt-prod-row">
                        <span className="hn-mono">{p.line}</span>
                        <span className="hn-mono">{p.product}</span>
                        <span className="hn-qt-ellip">{p.description}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>{p.qty}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(p.retail)}</span>
                        <span className="hn-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>${fmtMoney(p.discount)}</span>
                        <span>{p.type && <span className="hn-qt-type">{p.type}</span>}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>
                          {p.type === 'PROM' || p.type === 'ONLP' || p.type === 'PROD'
                            ? <span className="hn-qt-quoted-promo">${fmtMoney(p.quoted)}</span>
                            : <span>${fmtMoney(p.quoted)}</span>}
                        </span>
                        <span className="hn-mono" style={{ textAlign: 'right', fontWeight: 600 }}>${fmtMoney(p.total)}</span>
                        <span className="hn-mono" style={{ fontSize: '11px' }}>{p.expires || '—'}</span>
                        <span className="hn-mono" style={{ textAlign: 'right' }}>
                          {p.sc
                            ? <span className="hn-qt-current-flag">${fmtMoney(p.current)}</span>
                            : <span style={{ color: 'var(--text-muted)' }}>${fmtMoney(p.current)}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="hn-oo-empty" style={{ padding: '24px' }}>
                  {selected ? 'No product lines on this quotation.' : 'Select a quotation to view its products.'}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — progress notes */}
          <div className="hn-qt-side">
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Progress Notes</div>
              <div className="hn-oo-progress">
                {selected && selected.progressNotes.length > 0 ? (
                  selected.progressNotes.map((p, i) => (
                    <div key={i} className="hn-oo-progress-row">
                      <div className="hn-oo-progress-when hn-mono">{p.when} · {p.op}</div>
                      <div className="hn-oo-progress-text">{p.text}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>No progress notes yet.</div>
                )}
              </div>
              <div className="hn-qt-addnote">
                <input className="hn-qt-addnote-input" placeholder="Add progress notes…" />
              </div>
            </div>
            {selected && (
              <div className="hn-oo-card">
                <div className="hn-oo-card-head">Quotation</div>
                <div className="hn-qt-side-info">
                  <div><span className="hn-detail-label">Status</span><span className="hn-cst-dv">{selected.status}</span></div>
                  <div><span className="hn-detail-label">Customer</span><span className="hn-cst-dv">{selected.customer}</span></div>
                  <div><span className="hn-detail-label">Created</span><span className="hn-cst-dv hn-mono">{selected.created}</span></div>
                  <div><span className="hn-detail-label">Expiry</span><span className="hn-cst-dv hn-mono">{selected.expiry}</span></div>
                  <div><span className="hn-detail-label">Last Update</span><span className="hn-cst-dv hn-mono">{selected.lastUpdate}</span></div>
                  <div><span className="hn-detail-label">Total</span><span className="hn-cst-dv hn-mono" style={{ color: 'var(--accent)', fontWeight: 600 }}>${fmtMoney(selected.total)}</span></div>
                </div>
                <div className="hn-qt-side-actions">
                  <button type="button" className="hn-btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Modify</button>
                  <button type="button" className="hn-btn-primary" style={{ flex: 1, padding: '9px 0' }}>Open Quotation</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Other</span>
          <span>{quotesFiltered.length} quotation{quotesFiltered.length !== 1 ? 's' : ''} shown</span>
        </div>
      </main>
    );
  };

  // ---- Online Quick Reservations screen ----
  const reservationsFiltered = MOCK_RESERVATIONS.filter((r) => {
    const q = resQuery.trim().toLowerCase();
    const matchesText = !q
      || r.resNo.toLowerCase().includes(q)
      || r.surname.toLowerCase().includes(q)
      || r.custNumber.toLowerCase().includes(q);
    const matchesCompleted = resShowCompleted || r.status !== 'Completed';
    const matchesWithdrawn = resShowWithdrawn || r.status !== 'Withdrawn';
    return matchesText && matchesCompleted && matchesWithdrawn;
  });

  const renderReservations = () => {
    const selected = MOCK_RESERVATIONS.find((r) => r.resNo === resSel) || null;
    const item = selected && selected.items.length > 0 ? selected.items[0] : null;
    const RESERVATION_ACTIONS = ['Confirm Reserve', 'Reject Order', 'Generate Sales Orders', 'Pick Slip', 'Confirm Withdrawn', 'Purchased Other', "Didn't Purchase"];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Online Quick Reservations</h1>
        </div>

        {/* Search + filter bar */}
        <div className="hn-rs-toolbar hn-fade-in">
          <div className="hn-rs-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              className="hn-rs-search-input hn-mono"
              placeholder="Search reservation #, surname or phone…"
              value={resQuery}
              onChange={(e) => setResQuery(e.target.value)}
            />
          </div>
          <label className="hn-cst-checkbox">
            <input type="checkbox" checked={resShowCompleted} onChange={(e) => setResShowCompleted(e.target.checked)} />
            <span>Show Completed</span>
          </label>
          <label className="hn-cst-checkbox">
            <input type="checkbox" checked={resShowWithdrawn} onChange={(e) => setResShowWithdrawn(e.target.checked)} />
            <span>Show Withdrawn</span>
          </label>
          <div className="hn-rs-movex">
            <span className="hn-detail-label">Movex</span>
            <span className="hn-mono" style={{ fontWeight: 600 }}>L3M</span>
          </div>
        </div>

        {/* Master / detail */}
        <div className="hn-rs-layout hn-fade-in">

          {/* LEFT — list + items */}
          <div className="hn-rs-main">
            {/* Reservations list */}
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Reservations</div>
              <div className="hn-rs-list">
                <div className="hn-rs-list-head">
                  <span>Status</span><span>Reservation #</span><span>Created</span>
                  <span style={{ textAlign: 'right' }}>Total</span><span>Surname</span><span>Customer #</span>
                </div>
                <div className="hn-rs-list-body">
                  {reservationsFiltered.map((r) => (
                    <button
                      key={r.resNo}
                      type="button"
                      className={`hn-rs-row ${resSel === r.resNo ? 'active' : ''}`}
                      onClick={() => setResSel(r.resNo)}
                    >
                      <span><span className="hn-oo-badge new">{r.status}</span></span>
                      <span className="hn-mono">{r.resNo}</span>
                      <span className="hn-mono">{r.created}</span>
                      <span className="hn-mono" style={{ textAlign: 'right', fontWeight: 600 }}>${fmtMoney(r.resTotal)}</span>
                      <span>{r.surname}</span>
                      <span className="hn-mono">{r.custNumber}</span>
                    </button>
                  ))}
                  {reservationsFiltered.length === 0 && (
                    <div className="hn-oo-empty">No reservations match your search.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Reservation items */}
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Reservation Details</div>
              {item ? (
                <div className="hn-rs-items">
                  <div className="hn-rs-items-head">
                    <span>Dept</span><span>Product</span><span>Description</span>
                    <span style={{ textAlign: 'right' }}>Qty</span>
                    <span style={{ textAlign: 'right' }}>Price</span>
                    <span style={{ textAlign: 'right' }}>Total</span>
                    <span>Type / Alloc</span>
                  </div>
                  {selected.items.map((it, i) => (
                    <div key={i} className="hn-rs-items-row">
                      <span className="hn-mono">{it.dept}</span>
                      <span className="hn-mono">{it.posProduct}</span>
                      <span className="hn-rs-ellip">{it.posDescription}</span>
                      <span className="hn-mono" style={{ textAlign: 'right' }}>{it.posQty.toFixed(2)}</span>
                      <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(it.price)}</span>
                      <span className="hn-mono" style={{ textAlign: 'right', fontWeight: 600 }}>${fmtMoney(it.total)}</span>
                      <span className="hn-mono" style={{ fontSize: '11px' }}>{it.typeAlloc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hn-oo-empty" style={{ padding: '24px' }}>
                  {selected ? 'No reservation items mocked for this row yet.' : 'Select a reservation to view its items.'}
                </div>
              )}
            </div>

            {/* Product info + notes (only when an item is present) */}
            {item && (
              <div className="hn-rs-two">
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Product Information · Inventory</div>
                  <div className="hn-rs-inv">
                    <div><span>Stock On Hand</span><span className="hn-mono">{item.inventory.soh.toFixed(2)}</span></div>
                    <div><span>Stock On Order</span><span className="hn-mono">{item.inventory.soo.toFixed(2)}</span></div>
                    <div><span>Customer Orders</span><span className="hn-mono">{item.inventory.customerOrders.toFixed(2)}</span></div>
                    <div><span>N/A for Sale</span><span className="hn-mono">{item.inventory.naForSale.toFixed(2)}</span></div>
                    <div className="hn-rs-inv-total"><span>Total Available for Sale</span><span className="hn-mono">{item.inventory.totalAvailable.toFixed(2)}</span></div>
                  </div>
                </div>
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Product Notes</div>
                  <div className="hn-rs-prodnote">{item.notes || '—'}</div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — customer details + progress notes */}
          <div className="hn-rs-side">
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Online Customer Details</div>
              {selected ? (
                <div className="hn-rs-cust">
                  <div className="hn-oo-name">{selected.customer.name || selected.surname}</div>
                  <div className="hn-mono" style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '4px' }}>{selected.customer.phone}</div>
                  {selected.customer.email && <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', wordBreak: 'break-all' }}>{selected.customer.email}</div>}
                  {selected.customer.address && <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '6px' }}>{selected.customer.address}</div>}
                  <div className="hn-rs-custno hn-mono">Customer #: {selected.custNumber}</div>
                </div>
              ) : (
                <div className="hn-oo-empty" style={{ padding: '20px' }}>No customer selected.</div>
              )}
            </div>

            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Invoice Progress Notes</div>
              <div className="hn-oo-progress">
                {selected && selected.progressNotes.length > 0 ? (
                  selected.progressNotes.map((p, i) => (
                    <div key={i} className="hn-oo-progress-row">
                      <div className="hn-oo-progress-when hn-mono">{p.when} · {p.op}</div>
                      <div className="hn-oo-progress-text">{p.text}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: '12.5px', color: 'var(--text-faint)' }}>No progress notes yet.</div>
                )}
              </div>
            </div>

            {selected && (
              <div className="hn-oo-card">
                <div className="hn-oo-card-head">Actions</div>
                <div className="hn-rs-actions">
                  {RESERVATION_ACTIONS.map((a) => (
                    <button key={a} type="button" className="hn-rs-action-btn">{a}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Other</span>
          <span>{reservationsFiltered.length} reservation{reservationsFiltered.length !== 1 ? 's' : ''} shown</span>
        </div>
      </main>
    );
  };

  // ---- Sales KPIs screen ----
  // Heatmap cell colour: red (under target) → amber → green (over target).
  const kpiCellStyle = (val) => {
    if (val === null || val === undefined) return { background: 'transparent' };
    // Stronger, more saturated bands so the heatmap reads at a glance.
    const clamped = Math.max(0, Math.min(260, val));
    let bg, fg;
    if (clamped < 60)       { bg = 'rgba(220,38,38,0.72)';  fg = '#fff'; }
    else if (clamped < 85)  { bg = 'rgba(234,88,12,0.62)';  fg = '#fff'; }
    else if (clamped < 100) { bg = 'rgba(234,179,8,0.60)';  fg = '#422006'; }
    else if (clamped < 130) { bg = 'rgba(22,163,74,0.55)';  fg = '#fff'; }
    else                    { bg = 'rgba(21,128,61,0.85)';  fg = '#fff'; }
    return { background: bg, color: fg };
  };

  // Status label + colour tokens for a % value (shared by gauges and cards).
  const kpiStatus = (pct) => {
    if (pct >= 100) return { label: 'Achieved', color: '#16A34A', soft: 'rgba(22,163,74,0.10)' };
    if (pct >= 90)  return { label: 'On Track', color: '#65A30D', soft: 'rgba(101,163,13,0.10)' };
    if (pct >= 75)  return { label: 'Behind',   color: '#CA8A04', soft: 'rgba(202,138,4,0.10)' };
    return { label: 'Behind', color: '#DC2626', soft: 'rgba(220,38,38,0.10)' };
  };

  // Semi-circular gauge (SVG). pct is % of target; arc fills up to 100% of the
  // half-circle at 150%+ so over-achievers visibly max out.
  const KpiGauge = ({ pct }) => {
    const s = kpiStatus(pct);
    const R = 52, CX = 60, CY = 60, STROKE = 13;
    const semi = Math.PI * R; // length of the half-circle arc
    const frac = Math.max(0, Math.min(1, pct / 150));
    const dash = `${frac * semi} ${semi}`;
    return (
      <svg viewBox="0 0 120 72" className="hn-kpi-gauge-svg" role="img" aria-label={`${pct}% of target`}>
        <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke="var(--border)" strokeWidth={STROKE} strokeLinecap="round" />
        <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke={s.color} strokeWidth={STROKE} strokeLinecap="round" strokeDasharray={dash} pathLength={semi} />
        <text x={CX} y={CY - 4} textAnchor="middle" className="hn-kpi-gauge-val" fill={s.color}>{pct.toFixed(0)}%</text>
      </svg>
    );
  };

  const kpiTargetBar = (pct) => {
    const width = Math.max(2, Math.min(100, pct));
    const color = pct >= 100 ? 'var(--success)' : pct >= 85 ? '#CA8A04' : '#DC2626';
    return (
      <div className="hn-kpi-bar">
        <div className="hn-kpi-bar-fill" style={{ width: `${width}%`, background: color }} />
      </div>
    );
  };

  const renderSalesKpis = () => {
    const type = kpiSalesType;
    const head = KPI_HEADLINE[type];
    const spTargets = KPI_SALESPERSON_TARGETS[type];
    const deptTargets = KPI_DEPARTMENT_TARGETS[type];
    const store = KPI_STORE_TARGET[type];
    const compareRows = KPI_COMPARE_ROWS[type];
    // Rankings derived from the active sales type; sort key is user-selectable
    // (% of target vs raw $ MTD — a rep can be #1 on dollars but mid-pack on %).
    const rankings = [...spTargets]
      .sort((a, b) => (kpiRankSort === 'mtd' ? b.mtd - a.mtd : b.pct - a.pct))
      .map((r, i) => ({ rank: i + 1, ...r }));
    const fmtK = (n) => `$${(n / 1000).toFixed(0)}K`;
    const monthName = KPI_MONTHS[kpiMonth];

    // Logged-in salesperson's own metric set (Salesperson Targets tab). The
    // login uses 4-digit operator codes; KPI data is keyed by rep code (e.g.
    // 1979 = MIKAEL). Fall back to a default set when there's no bespoke data.
    const myCode = operatorNumber || '1979';
    const myName = OPERATOR_NAMES[myCode] || `Operator ${myCode}`;
    const myMetrics = (KPI_MY_METRICS[type] && KPI_MY_METRICS[type][myCode]) || KPI_MY_METRICS_DEFAULT[type];
    const growth = kpiGrowthFor(type, kpiMonth).slice(0, kpiYearSpan);

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
            <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Sales KPIs</h1>
            <p style={{ marginTop: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>Sales for Today · {KPI_MONTHS[KPI_LATEST_COMPLETE_MONTH]} {KPI_DATA_YEAR} KPIs · L3M</p>
          </div>
          {/* Delivered / Written toggle */}
          <div className="hn-kpi-typetoggle">
            <button type="button" className={`hn-kpi-typebtn ${type === 'delivered' ? 'active' : ''}`} onClick={() => setKpiSalesType('delivered')}>Delivered Sales</button>
            <button type="button" className={`hn-kpi-typebtn ${type === 'written' ? 'active' : ''}`} onClick={() => setKpiSalesType('written')}>Written Sales</button>
          </div>
        </div>

        {/* Headline tiles */}
        <div className="hn-kpi-headline hn-fade-in">
          {[
            ['Sales Revenue', head.salesRevenue],
            ['Net Profit %', head.netProfit],
            ['Invoices', head.invoices],
            ['Average Sale', head.averageSale],
            ['Products / Invoice', head.productsPerInvoice],
            ['% of Month', head.ofMonth],
          ].map(([label, val]) => (
            <div key={label} className="hn-kpi-tile">
              <span className="hn-kpi-tile-value hn-mono">{val}</span>
              <span className="hn-kpi-tile-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Sub-menu tabs */}
        <div className="hn-kpi-tabs hn-fade-in">
          {KPI_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`hn-kpi-tab ${kpiTab === t.id ? 'active' : ''}`}
              onClick={() => setKpiTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="hn-fade-in" key={`${kpiTab}-${type}`}>
          {/* ---- Salesperson Targets: the LOGGED-IN rep's own metric gauges ---- */}
          {kpiTab === 'salesperson' && (
            <>
              <div className="hn-kpi-myheader">
                <div className="hn-kpi-myheader-badge">{myName.split(' ').map((w) => w[0]).join('').slice(0, 2)}</div>
                <div>
                  <div className="hn-kpi-myheader-name">{myName}</div>
                  <div className="hn-kpi-myheader-sub hn-mono">Operator {myCode} · {type === 'delivered' ? 'Delivered' : 'Written'} · your targets this month</div>
                </div>
              </div>
              <div className="hn-kpi-gauge-grid">
                {myMetrics.map((m) => {
                  const st = kpiStatus(m.pct);
                  const fmtVal = (n) => m.pctMetric ? `${n}%` : (n >= 1000 ? fmtK(n) : `$${n}`);
                  return (
                    <div key={m.label} className="hn-kpi-gauge-card" style={{ borderColor: st.color, background: st.soft }}>
                      <div className="hn-kpi-gauge-name">{m.label}</div>
                      <div className="hn-kpi-gauge-chips">
                        <div className="hn-kpi-chip"><span>Target</span><b className="hn-mono">{fmtVal(m.target)}</b></div>
                        <div className="hn-kpi-chip should"><span>Should be</span><b className="hn-mono">{fmtVal(m.shouldBe)}</b></div>
                        <div className="hn-kpi-chip mtd" style={{ background: st.color }}><span>MTD</span><b className="hn-mono">{fmtVal(m.mtd)}</b></div>
                      </div>
                      <div className="hn-kpi-gauge-status" style={{ color: st.color }}>{st.label}</div>
                      <KpiGauge pct={m.pct} />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* ---- Department Targets: gauge cards ---- */}
          {kpiTab === 'department' && (
            <>
            <div className="hn-kpi-gauge-grid">
              {deptTargets.map((r) => {
                const st = kpiStatus(r.pct);
                return (
                  <div key={r.dept} className="hn-kpi-gauge-card" style={{ borderColor: st.color, background: st.soft }}>
                    <div className="hn-kpi-gauge-name">{r.dept}</div>
                    <div className="hn-kpi-gauge-chips">
                      <div className="hn-kpi-chip"><span>Target</span><b className="hn-mono">{fmtK(r.target)}</b></div>
                      <div className="hn-kpi-chip mtd" style={{ background: st.color }}><span>MTD</span><b className="hn-mono">{fmtK(r.actual)}</b></div>
                    </div>
                    <div className="hn-kpi-gauge-status" style={{ color: st.color }}>{st.label}</div>
                    <KpiGauge pct={r.pct} />
                  </div>
                );
              })}
            </div>

            {/* Electrical sales mix — sub-department contribution donut.
                Only Electrical has a breakdown for now; segments reuse the
                department actuals above so both views always agree. */}
            {(() => {
              const segs = KPI_DEPT_MIX[type].Electrical;
              const total = segs.reduce((a, s) => a + s.value, 0);
              const R = 50;
              const C = 2 * Math.PI * R;
              let acc = 0;
              return (
                <div className="hn-oo-card" style={{ marginTop: '16px' }}>
                  <div className="hn-oo-card-head">Electrical Sales Mix · {type === 'delivered' ? 'Delivered' : 'Written'} · sub-department contribution</div>
                  <div className="hn-kpi-pie-wrap">
                    <svg viewBox="0 0 140 140" className="hn-kpi-pie" role="img" aria-label="Electrical sales mix pie chart">
                      <g transform="rotate(-90 70 70)">
                        {segs.map((s) => {
                          const frac = s.value / total;
                          const seg = (
                            <circle
                              key={s.label}
                              cx="70" cy="70" r={R}
                              fill="none"
                              stroke={s.color}
                              strokeWidth="26"
                              strokeDasharray={`${frac * C} ${C}`}
                              strokeDashoffset={-acc * C}
                            />
                          );
                          acc += frac;
                          return seg;
                        })}
                      </g>
                      <text x="70" y="66" textAnchor="middle" className="hn-kpi-pie-total hn-mono">${(total / 1000).toFixed(0)}K</text>
                      <text x="70" y="82" textAnchor="middle" className="hn-kpi-pie-sub">Electrical MTD</text>
                    </svg>
                    <div className="hn-kpi-pie-legend">
                      {segs.map((s) => {
                        const pct = (s.value / total) * 100;
                        return (
                          <div key={s.label} className="hn-kpi-pie-row">
                            <span className="hn-kpi-pie-sw" style={{ background: s.color }} />
                            <span className="hn-kpi-pie-label">{s.label}</span>
                            <span className="hn-mono hn-kpi-pie-val">${(s.value / 1000).toFixed(1)}K</span>
                            <span className="hn-mono hn-kpi-pie-pct" style={{ color: s.color }}>{pct.toFixed(1)}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
            </>
          )}

          {/* ---- Store Targets ---- */}
          {kpiTab === 'store' && (
            <div className="hn-kpi-store">
              <div className="hn-kpi-store-hero">
                <div className="hn-kpi-store-hero-label">Month to Date · {type === 'delivered' ? 'Delivered' : 'Written'}</div>
                <div className="hn-kpi-store-hero-value hn-mono">${(store.monthActual / 1000).toFixed(1)}K</div>
                <div className="hn-kpi-store-hero-sub">of ${(store.monthTarget / 1000).toFixed(0)}K target</div>
                <div className="hn-kpi-store-hero-bar">
                  <div className="hn-kpi-store-hero-fill" style={{ width: `${Math.min(100, store.pct)}%` }} />
                </div>
                <div className="hn-kpi-store-hero-pct">{store.pct.toFixed(1)}% of target · {kpiStatus(store.pct).label}</div>
              </div>
              <div className="hn-kpi-store-grid">
                {[
                  ['Today', `$${(store.dayActual/1000).toFixed(1)}K`, `Target $${(store.dayTarget/1000).toFixed(0)}K`, store.dayPct],
                  ['Net Profit', `${store.netProfitActual}%`, `Target ${store.netProfitTarget}%`, (store.netProfitActual/store.netProfitTarget)*100],
                  ['Invoices', store.invoicesActual.toLocaleString('en-AU'), `Target ${store.invoicesTarget.toLocaleString('en-AU')}`, (store.invoicesActual/store.invoicesTarget)*100],
                  ['Average Sale', `$${store.avgSaleActual}`, `Target $${store.avgSaleTarget}`, (store.avgSaleActual/store.avgSaleTarget)*100],
                ].map(([label, val, sub, pct]) => {
                  const st = kpiStatus(pct);
                  return (
                    <div key={label} className="hn-kpi-store-cell" style={{ borderTopColor: st.color }}>
                      <span className="hn-kpi-store-cell-label">{label}</span>
                      <span className="hn-kpi-store-cell-value hn-mono">{val}</span>
                      <span className="hn-kpi-store-cell-sub">{sub}</span>
                      <span className="hn-kpi-store-cell-pct hn-mono" style={{ color: st.color }}>{pct.toFixed(1)}% · {st.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---- Rankings ---- */}
          {kpiTab === 'rankings' && (
            <div className="hn-oo-card">
              <div className="hn-oo-card-head" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <span>Rankings · {type === 'delivered' ? 'Delivered' : 'Written'} Sales</span>
                <div className="hn-kpi-typetoggle">
                  <button type="button" className={`hn-kpi-typebtn ${kpiRankSort === 'pct' ? 'active' : ''}`} onClick={() => setKpiRankSort('pct')}>% of Target</button>
                  <button type="button" className={`hn-kpi-typebtn ${kpiRankSort === 'mtd' ? 'active' : ''}`} onClick={() => setKpiRankSort('mtd')}>$ Sold MTD</button>
                </div>
              </div>
              <div className="hn-kpi-rank-body">
                {rankings.map((r) => (
                  <div key={r.name} className={`hn-kpi-rank-row ${r.rank <= 3 ? 'podium' : ''}`}>
                    <span className={`hn-kpi-rank-medal rank-${r.rank <= 3 ? r.rank : 'n'}`}>{r.rank}</span>
                    <span className="hn-kpi-rank-name">{r.name}</span>
                    <span className="hn-mono" style={{ color: 'var(--text-muted)' }}>${r.mtd.toLocaleString('en-AU')}</span>
                    {kpiTargetBar(r.pct)}
                    <span className="hn-mono hn-kpi-pct" style={{ color: r.pct >= 100 ? 'var(--success)' : r.pct >= 85 ? '#CA8A04' : '#DC2626' }}>{r.pct.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---- Comparison heatmap ---- */}
          {kpiTab === 'comparison' && (
            <div className="hn-oo-card">
              <div className="hn-oo-card-head">Salesperson Comparison · {type === 'delivered' ? 'Delivered' : 'Written'} · % of Target</div>
              <div className="hn-kpi-compare-scroll">
                <table className="hn-kpi-compare">
                  <thead>
                    <tr>
                      <th className="hn-kpi-compare-namecol">Sales Person</th>
                      {KPI_COMPARE_COLUMNS.map((c) => <th key={c}>{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row) => (
                      <tr key={row.name}>
                        <td className="hn-kpi-compare-namecol">{row.name}</td>
                        {row.v.map((val, i) => (
                          <td key={i} style={kpiCellStyle(val)}>
                            {val === null || val === undefined ? '' : `${val.toFixed(1)}%`}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="hn-kpi-legend">
                <span><span className="hn-kpi-legend-sw" style={{ background: 'rgba(220,38,38,0.72)' }} /> Under 60%</span>
                <span><span className="hn-kpi-legend-sw" style={{ background: 'rgba(234,88,12,0.62)' }} /> 60–85%</span>
                <span><span className="hn-kpi-legend-sw" style={{ background: 'rgba(234,179,8,0.60)' }} /> 85–100%</span>
                <span><span className="hn-kpi-legend-sw" style={{ background: 'rgba(22,163,74,0.55)' }} /> 100–130%</span>
                <span><span className="hn-kpi-legend-sw" style={{ background: 'rgba(21,128,61,0.85)' }} /> Over 130%</span>
              </div>
            </div>
          )}

          {/* ---- Year-over-Year Growth ---- */}
          {kpiTab === 'growth' && (() => {
            const maxRev = Math.max(...growth.map((g) => g.revenue));
            const thisYear = growth[0];
            const lastYear = growth[1];
            const yoy = ((thisYear.revenue - lastYear.revenue) / lastYear.revenue) * 100;
            // CAGR always looks 5 years back regardless of the chart range toggle.
            const fiveYrAgo = kpiGrowthFor(type, kpiMonth).find((g) => g.year === thisYear.year - 5);
            const cagr5 = fiveYrAgo ? ((Math.pow(thisYear.revenue / fiveYrAgo.revenue, 1 / 5) - 1) * 100) : null;
            return (
              <>
                {/* Month + range controls — the whole tab re-anchors to any month */}
                <div className="hn-kpi-growth-controls">
                  <div className="hn-kpi-growth-ctrl">
                    <label className="hn-field-label" style={{ marginBottom: 0 }}>Month</label>
                    <select
                      className="hn-kpi-month-select"
                      value={kpiMonth}
                      onChange={(e) => setKpiMonth(Number(e.target.value))}
                    >
                      {KPI_MONTHS.map((m, i) => (
                        <option key={m} value={i}>
                          {m}{i > KPI_LATEST_COMPLETE_MONTH ? ` (no ${KPI_DATA_YEAR} data yet)` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="hn-kpi-growth-ctrl">
                    <label className="hn-field-label" style={{ marginBottom: 0 }}>Range</label>
                    <div className="hn-kpi-typetoggle">
                      <button type="button" className={`hn-kpi-typebtn ${kpiYearSpan === 5 ? 'active' : ''}`} onClick={() => setKpiYearSpan(5)}>5 Years</button>
                      <button type="button" className={`hn-kpi-typebtn ${kpiYearSpan === 10 ? 'active' : ''}`} onClick={() => setKpiYearSpan(10)}>10 Years</button>
                    </div>
                  </div>
                </div>

                {/* Summary cards */}
                <div className="hn-kpi-growth-summary">
                  <div className="hn-kpi-growth-card">
                    <span className="hn-kpi-growth-card-label">{monthName} {thisYear.year}</span>
                    <span className="hn-kpi-growth-card-value hn-mono">${(thisYear.revenue / 1000).toFixed(1)}K</span>
                    <span className="hn-kpi-growth-card-sub" style={{ color: yoy >= 0 ? '#16A34A' : '#DC2626' }}>
                      {yoy >= 0 ? '▲' : '▼'} {Math.abs(yoy).toFixed(1)}% vs {monthName} {lastYear.year}
                    </span>
                  </div>
                  <div className="hn-kpi-growth-card">
                    <span className="hn-kpi-growth-card-label">{monthName} {lastYear.year}</span>
                    <span className="hn-kpi-growth-card-value hn-mono">${(lastYear.revenue / 1000).toFixed(1)}K</span>
                    <span className="hn-kpi-growth-card-sub">prior year</span>
                  </div>
                  <div className="hn-kpi-growth-card">
                    <span className="hn-kpi-growth-card-label">5-Year Growth Rate</span>
                    <span className="hn-kpi-growth-card-value hn-mono">{cagr5 !== null ? `${cagr5.toFixed(1)}%` : '—'}</span>
                    <span className="hn-kpi-growth-card-sub">avg per year (CAGR)</span>
                  </div>
                </div>

                {/* Bar chart: selected month's revenue by year */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">{monthName} Revenue by Year · {type === 'delivered' ? 'Delivered' : 'Written'}</div>
                  <div className="hn-kpi-growth-chart">
                    {[...growth].reverse().map((g) => {
                      const h = Math.max(4, (g.revenue / maxRev) * 100);
                      const isThis = g.year === thisYear.year;
                      const prev = growth.find((x) => x.year === g.year - 1);
                      const delta = prev ? ((g.revenue - prev.revenue) / prev.revenue) * 100 : null;
                      return (
                        <div key={g.year} className="hn-kpi-growth-bar-col">
                          <span className="hn-kpi-growth-bar-val hn-mono">${(g.revenue / 1000).toFixed(0)}K</span>
                          <div className="hn-kpi-growth-bar-track">
                            <div
                              className="hn-kpi-growth-bar-fill"
                              style={{ height: `${h}%`, background: isThis ? 'linear-gradient(180deg,#60A5FA,#2563EB)' : '#94A3B8' }}
                            />
                          </div>
                          {delta !== null && (
                            <span className="hn-kpi-growth-bar-delta" style={{ color: delta >= 0 ? '#16A34A' : '#DC2626' }}>
                              {delta >= 0 ? '+' : ''}{delta.toFixed(0)}%
                            </span>
                          )}
                          <span className="hn-kpi-growth-bar-year hn-mono" style={{ fontWeight: isThis ? 700 : 400 }}>{g.year}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Monthly trend: every month of the latest year in view.
                    Bars are clickable — tapping one re-anchors the whole tab
                    to that month, so it doubles as a second month picker. */}
                {(() => {
                  const trend = kpiMonthlyFor(type, thisYear.year);
                  const vals = trend.filter((v) => v !== null);
                  const maxM = Math.max(...vals);
                  return (
                    <div className="hn-oo-card">
                      <div className="hn-oo-card-head">Monthly Trend · {thisYear.year} · {type === 'delivered' ? 'Delivered' : 'Written'} <span className="hn-kpi-trend-hint">click a bar to change month</span></div>
                      <div className="hn-kpi-trend-strip">
                        {trend.map((v, m) => (
                          <button
                            key={m}
                            type="button"
                            className={`hn-kpi-trend-col ${m === kpiMonth ? 'active' : ''} ${v === null ? 'empty' : ''}`}
                            onClick={() => v !== null && setKpiMonth(m)}
                            disabled={v === null}
                            title={v === null ? `${KPI_MONTHS[m]} — no data yet` : `${KPI_MONTHS[m]}: $${(v / 1000).toFixed(0)}K`}
                          >
                            <span className="hn-kpi-trend-val hn-mono">{v === null ? '—' : `$${(v / 1000).toFixed(0)}K`}</span>
                            <div className="hn-kpi-trend-track">
                              {v !== null && <div className="hn-kpi-trend-fill" style={{ height: `${Math.max(4, (v / maxM) * 100)}%` }} />}
                            </div>
                            <span className="hn-kpi-trend-month">{KPI_MONTHS[m].slice(0, 3)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Year-by-year table */}
                <div className="hn-oo-card">
                  <div className="hn-oo-card-head">Year-on-Year Detail · {monthName}</div>
                  <div className="hn-kpi-tt-head" style={{ gridTemplateColumns: '100px 1fr 160px 120px' }}>
                    <span>{monthName}</span><span>Revenue</span><span>Change $</span><span style={{ textAlign: 'right' }}>Change %</span>
                  </div>
                  <div className="hn-kpi-tt-body">
                    {growth.map((g) => {
                      const prev = growth.find((x) => x.year === g.year - 1);
                      const dAmt = prev ? g.revenue - prev.revenue : null;
                      const dPct = prev ? (dAmt / prev.revenue) * 100 : null;
                      return (
                        <div key={g.year} className="hn-kpi-tt-row" style={{ gridTemplateColumns: '100px 1fr 160px 120px' }}>
                          <span className="hn-mono">{g.year}</span>
                          <span className="hn-mono">${g.revenue.toLocaleString('en-AU')}</span>
                          <span className="hn-mono" style={{ color: dAmt === null ? 'var(--text-faint)' : dAmt >= 0 ? '#16A34A' : '#DC2626' }}>
                            {dAmt === null ? '—' : `${dAmt >= 0 ? '+' : '−'}$${Math.abs(dAmt).toLocaleString('en-AU')}`}
                          </span>
                          <span className="hn-mono hn-kpi-pct" style={{ color: dPct === null ? 'var(--text-faint)' : dPct >= 0 ? '#16A34A' : '#DC2626' }}>
                            {dPct === null ? '—' : `${dPct >= 0 ? '+' : ''}${dPct.toFixed(1)}%`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Other · <kbd className="hn-kbd-inline">1</kbd>–<kbd className="hn-kbd-inline">6</kbd> Tabs · <kbd className="hn-kbd-inline">D</kbd>/<kbd className="hn-kbd-inline">W</kbd> Delivered/Written</span>
          <span>{KPI_TABS.find((t) => t.id === kpiTab)?.label} · {type === 'delivered' ? 'Delivered' : 'Written'}</span>
        </div>
      </main>
    );
  };

  // ═══ Cashiers Menu screens (transcribed from terminal photos 1–7) ═══════════

  // ---- 1 · Retrieve Suspended Sale ----
  const rsFiltered = MOCK_SUSPENDED_SALES.filter((s) =>
    (!rsInvoiceQ.trim() || s.invoice.includes(rsInvoiceQ.trim())) &&
    (!rsTxnQ.trim() || s.txn.includes(rsTxnQ.trim())) &&
    (!rsNameQ.trim() || s.assistant.toLowerCase().includes(rsNameQ.trim().toLowerCase()))
  );

  const renderRetrieveSuspended = () => {
    const selected = rsFiltered.find((s) => s.id === rsSel) || rsFiltered[0] || null;
    const placeholderAction = (what) =>
      setRsNotice(`${what} will work on the live tape once SAP is wired up — nothing was changed.`);

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Retrieve Suspended Sale</h1>
          <p className="hn-screen-sub" style={{ margin: '6px 0 0' }}>Find a suspended tape and pick up exactly where the sale left off.</p>
        </div>

        {/* Search + Notes — mirrors the terminal's two top panels */}
        <div className="hn-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px', marginBottom: '16px' }}>
          <div className="hn-us-card" style={{ padding: '16px' }}>
            <div className="hn-panel-title" style={{ marginBottom: '12px' }}>Search</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="hn-field-label">Invoice #</label>
                <input className="hn-input hn-mono" value={rsInvoiceQ} onChange={(e) => setRsInvoiceQ(e.target.value.replace(/\D/g, ''))} placeholder="0" />
              </div>
              <div>
                <label className="hn-field-label">Transaction #</label>
                <input className="hn-input hn-mono" value={rsTxnQ} onChange={(e) => setRsTxnQ(e.target.value.replace(/\D/g, ''))} placeholder="0" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="hn-field-label">Name</label>
                <input className="hn-input" value={rsNameQ} onChange={(e) => setRsNameQ(e.target.value)} placeholder="Assistant name…" />
              </div>
            </div>
          </div>
          <div className="hn-us-card" style={{ padding: '16px' }}>
            <div className="hn-panel-title" style={{ marginBottom: '12px' }}>Notes</div>
            <div className="hn-oo-notes" style={{ minHeight: '84px' }}>
              {selected ? (selected.notes || 'No notes on this suspended sale.') : 'Select a suspended sale to see its notes.'}
            </div>
          </div>
        </div>

        {/* Suspended tapes */}
        <div className="hn-us-card hn-fade-in">
          <div className="hn-oo-card-head">Suspended Sales</div>
          <div className="hn-rs-head">
            <span>Date</span><span>Time</span><span>Till</span><span>Transaction #</span><span>Invoice #</span>
            <span>Assistant Name</span><span>User</span><span>Type</span><span>Save At</span><span style={{ textAlign: 'right' }}>Amount</span>
          </div>
          <div>
            {rsFiltered.map((s) => (
              <button key={s.id} type="button" className={`hn-rs-row ${selected && selected.id === s.id ? 'active' : ''}`} onClick={() => setRsSel(s.id)}>
                <span className="hn-mono">{s.date}</span>
                <span className="hn-mono">{s.time}</span>
                <span className="hn-mono">{s.till}</span>
                <span className="hn-mono">{s.txn}</span>
                <span className="hn-mono">{s.invoice}</span>
                <span className="hn-us-ellip">{s.assistant}</span>
                <span className="hn-mono">{s.user}</span>
                <span>{s.type}</span>
                <span>{s.saveAt}</span>
                <span className="hn-mono" style={{ textAlign: 'right' }}>{s.amount || '—'}</span>
              </button>
            ))}
            {rsFiltered.length === 0 && <div className="hn-oo-empty">No suspended sales match your search.</div>}
          </div>
        </div>

        {/* Actions — the terminal's Enter=Retrieve / View Tape hotkeys */}
        <div className="hn-fade-in" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          <button type="button" className="hn-btn-primary" disabled={!selected} onClick={() => placeholderAction('Retrieve')} style={{ width: 'auto', padding: '10px 18px' }}>
            <Undo2 size={15} strokeWidth={2} /> Retrieve Sale
          </button>
          <button type="button" className="hn-us-action-btn" disabled={!selected} onClick={() => placeholderAction('View Tape')}>View Tape</button>
          <button type="button" className="hn-us-action-btn" disabled={!selected} onClick={() => placeholderAction('Invoice Recovery')}>View Invoice Recovery / Retrieve Transaction</button>
        </div>
        {rsNotice && (
          <div className="hn-fade-in" style={{ marginTop: '12px', padding: '9px 12px', borderRadius: '8px', background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.28)', fontSize: '12.5px', fontWeight: 500 }}>
            {rsNotice}
          </div>
        )}

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Cashiers Menu</span>
          <span>{rsFiltered.length} suspended sale{rsFiltered.length !== 1 ? 's' : ''}</span>
        </div>
      </main>
    );
  };

  // ---- 2 · Pending Invoice Cancelation ----
  const runPendingCancelSearch = () => {
    const q = pcQuery.trim();
    if (!q) return;
    const matches = searchInvoiceById(q);
    if (matches.length === 0) {
      setPcError('No invoice found. Check the number and try again.');
      setPcInvoice(null);
    } else {
      setPcError('');
      setPcInvoice(matches[0]);
    }
  };

  const confirmCancellation = () => {
    const reason = CANCEL_REASON_CODES.find((r) => r.code === pcReason.trim());
    if (!reason || !pcInvoice) return;
    setPcDone({ invoiceId: pcInvoice.id, reason });
    setPcReasonOpen(false);
    setPcReason('');
    setPcListOpen(false);
  };

  const renderPendingCancel = () => {
    const cust = pcInvoice ? customerForInvoice(pcInvoice) : null;
    const cancelled = pcDone && pcInvoice && pcDone.invoiceId === pcInvoice.id;

    return (
      <main className="hn-screen" style={{ maxWidth: '600px' }}>
        <div className="hn-fade-in" style={{ marginBottom: '24px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title">Pending Invoice Cancelation</h1>
          <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Find the invoice, then queue it for cancellation with a reason code.
          </p>
        </div>

        <div className="hn-card hn-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="hn-field-label">Invoice Number</label>
            <div className="hn-input-wrap">
              <FileText size={16} className="hn-input-icon" strokeWidth={1.75} />
              <input
                className="hn-input hn-mono"
                placeholder="e.g. INV-004821"
                value={pcQuery}
                onChange={(e) => { setPcQuery(e.target.value); setPcError(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); runPendingCancelSearch(); } }}
              />
            </div>
            {pcError && <div className="hn-error" style={{ marginTop: '10px' }}>{pcError}</div>}
            <span className="hn-field-hint">Type the invoice number and press <kbd className="hn-kbd-inline">↵</kbd> to search.</span>
          </div>
        </div>

        {pcInvoice && (
          <div className="hn-card hn-fade-in" style={{ padding: '20px', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span className="hn-mono" style={{ fontSize: '17px', fontWeight: 600 }}>{pcInvoice.id}</span>
              {cancelled ? (
                <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '3px 9px', borderRadius: '999px', background: 'rgba(185,28,28,0.1)', color: '#B91C1C' }}>Pending Cancellation</span>
              ) : (
                <span style={{
                  fontSize: '10.5px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px',
                  background: pcInvoice.status === 'Delivered' ? 'rgba(21,128,61,0.1)' : 'rgba(217,119,6,0.1)',
                  color: pcInvoice.status === 'Delivered' ? 'var(--success)' : '#B45309',
                }}>{pcInvoice.status}</span>
              )}
            </div>
            <div className="hn-cust-grid">
              <div><span className="hn-detail-label">Customer</span><span className="hn-detail-value">{cust ? `${cust.firstName} ${cust.lastName}` : '—'}</span></div>
              <div><span className="hn-detail-label">Raised</span><span className="hn-detail-value hn-mono">{pcInvoice.date}</span></div>
              <div><span className="hn-detail-label">Invoice Total</span><span className="hn-detail-value hn-mono">{pcInvoice.total}</span></div>
              <div><span className="hn-detail-label">Operator</span><span className="hn-detail-value hn-mono">{pcInvoice.operator || '—'}</span></div>
            </div>
            {cancelled ? (
              <div style={{ marginTop: '16px', padding: '10px 12px', borderRadius: '8px', background: 'rgba(185,28,28,0.06)', border: '1px solid rgba(185,28,28,0.25)', fontSize: '12.5px', fontWeight: 500 }}>
                Queued for cancellation — reason <span className="hn-mono" style={{ fontWeight: 700 }}>{pcDone.reason.code}</span> · {pcDone.reason.label}. Head office approval finalises it once SAP is wired up.
              </div>
            ) : (
              <button type="button" className="hn-btn-primary" onClick={() => { setPcReason(''); setPcListOpen(false); setPcReasonOpen(true); }} style={{ marginTop: '16px', width: 'auto', padding: '10px 18px', background: '#B91C1C' }}>
                <X size={15} strokeWidth={2} /> Cancel This Invoice…
              </button>
            )}
          </div>
        )}

        <div className="hn-screen-footer">
          <span><LiveClock type="date" /></span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Cashiers Menu</span>
        </div>
      </main>
    );
  };

  // ---- 3 · Invoice Further Payments ----
  const runFurtherPaymentsSearch = () => {
    const q = fpQuery.trim();
    if (!q) return;
    const matches = searchInvoiceById(q);
    if (matches.length === 0) {
      setFpError('No invoice found. Check the number and try again.');
      setFpInvoice(null);
    } else {
      setFpError('');
      setFpInvoice(matches[0]);
      setFpPayments([]);
      setFpAmount('');
    }
  };

  const renderFurtherPayments = () => {
    const inv = fpInvoice;
    const fin = inv ? inv.financials || {} : {};
    const paidSession = fpPayments.reduce((a, p) => a + p.amount, 0);
    const paidToDate = parseMoney(fin.paidToDate) + paidSession;
    const balance = Math.max(0, parseMoney(fin.balanceOwing) - paidSession);
    const amountNum = parseFloat(fpAmount) || 0;
    const canTake = inv && amountNum > 0 && amountNum <= balance + 0.001;

    const takePayment = () => {
      if (!canTake) return;
      const now = new Date();
      const when = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setFpPayments((ps) => [...ps, { id: `${Date.now()}-${ps.length}`, when, method: fpMethod, amount: amountNum }]);
      setFpAmount('');
    };

    return (
      <main className="hn-screen" style={{ maxWidth: '860px' }}>
        <div className="hn-fade-in" style={{ marginBottom: '20px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title">Invoice Further Payments</h1>
          <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Take an additional payment against an invoice with a balance owing.
          </p>
        </div>

        <div className="hn-card hn-fade-in" style={{ padding: '20px', marginBottom: '16px' }}>
          <label className="hn-field-label">Invoice Number</label>
          <div className="hn-input-wrap">
            <FileText size={16} className="hn-input-icon" strokeWidth={1.75} />
            <input
              className="hn-input hn-mono"
              placeholder="e.g. INV-005102"
              value={fpQuery}
              onChange={(e) => { setFpQuery(e.target.value); setFpError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); runFurtherPaymentsSearch(); } }}
            />
          </div>
          {fpError && <div className="hn-error" style={{ marginTop: '10px' }}>{fpError}</div>}
          <span className="hn-field-hint">Type the invoice number and press <kbd className="hn-kbd-inline">↵</kbd> to load its balance.</span>
        </div>

        {inv && (
          <div className="hn-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: '16px', alignItems: 'start' }}>
            {/* Financial summary */}
            <div className="hn-ledger-panel">
              <div className="hn-panel-title" style={{ marginBottom: '14px' }}>
                <span className="hn-mono">{inv.id}</span> · Financial Summary
              </div>
              <div className="hn-ledger-rows">
                {[
                  { label: 'Invoice Total', value: fin.invoiceTotal || '$0.00' },
                  { label: 'Paid to Date', value: `$${fmtMoney(paidToDate)}` },
                  { label: 'Finance Paid', value: fin.financePaid || '$0.00' },
                  { label: 'Balance Owing', value: `$${fmtMoney(balance)}`, highlight: true },
                ].map((row) => (
                  <div key={row.label} className={`hn-ledger-row ${row.highlight ? 'hn-ledger-row-balance' : ''}`}>
                    <span className="hn-ledger-label">{row.label}</span>
                    <span className={`hn-ledger-value hn-mono ${row.highlight ? 'hn-ledger-value-balance' : ''}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Take payment */}
            <div className="hn-panel">
              <div className="hn-panel-title">Take Further Payment</div>
              {balance <= 0 ? (
                <div style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 600, marginTop: '8px' }}>
                  This invoice is fully paid — no balance owing.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label className="hn-field-label">Amount</label>
                      <input
                        className="hn-input hn-mono"
                        placeholder={fmtMoney(balance)}
                        value={fpAmount}
                        inputMode="decimal"
                        onChange={(e) => setFpAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); takePayment(); } }}
                      />
                    </div>
                    <div>
                      <label className="hn-field-label">Method</label>
                      <select className="hn-input" value={fpMethod} onChange={(e) => setFpMethod(e.target.value)}>
                        {['EFTPOS', 'Cash', 'Credit Card', 'Cheque', 'Gift Card'].map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  {amountNum > balance + 0.001 && (
                    <div className="hn-error">Amount exceeds the balance owing (${fmtMoney(balance)}).</div>
                  )}
                  <button type="button" className="hn-btn-primary" disabled={!canTake} onClick={takePayment} style={{ width: 'auto', padding: '10px 18px' }}>
                    <CreditCard size={15} strokeWidth={2} /> Take Payment
                  </button>
                </div>
              )}

              {fpPayments.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div className="hn-panel-title">Payments This Session</div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }}>
                    {fpPayments.map((p) => (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '7px 0', borderBottom: '1px dashed var(--border)', fontSize: '12.5px' }}>
                        <span className="hn-mono" style={{ color: 'var(--text-muted)' }}>{p.when}</span>
                        <span style={{ flex: 1 }}>{p.method}</span>
                        <span className="hn-mono" style={{ fontWeight: 600 }}>${fmtMoney(p.amount)}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-faint)', marginTop: '8px' }}>
                    Payments post to the ledger once SAP is wired up.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="hn-screen-footer">
          <span><LiveClock type="date" /></span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Cashiers Menu</span>
        </div>
      </main>
    );
  };

  // ---- 6 · Till Balancing ----
  const renderTillBalancing = () => {
    const cashTotal = TILL_DENOMS.reduce((a, d) => a + d * (parseInt(tbCounts[String(d)], 10) || 0), 0);
    const countedFor = (t) => (t.cashLinked ? cashTotal : parseFloat(tbCounted[t.id]) || 0);
    const totalCounted = TILL_TENDERS.reduce((a, t) => a + countedFor(t), 0);
    const totalExpected = TILL_TENDERS.reduce((a, t) => a + t.expected, 0);
    const varianceStyle = (v) => ({
      color: Math.abs(v) < 0.005 ? 'var(--text-faint)' : v > 0 ? 'var(--success)' : '#B91C1C',
      fontWeight: Math.abs(v) < 0.005 ? 500 : 700,
    });

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Till Balancing</h1>
          <p className="hn-screen-sub" style={{ margin: '6px 0 0' }}>Count the drawer, reconcile each tender, and record the day's balance.</p>
        </div>

        <div className="hn-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)', gap: '16px', alignItems: 'start' }}>
          {/* Cash count */}
          <div className="hn-us-card" style={{ padding: '16px' }}>
            <div className="hn-panel-title" style={{ marginBottom: '10px' }}>Cash Count</div>
            {TILL_DENOMS.map((d) => {
              const count = parseInt(tbCounts[String(d)], 10) || 0;
              return (
                <div key={d} className="hn-tb-denom">
                  <input
                    className="hn-tb-input"
                    value={tbCounts[String(d)]}
                    inputMode="numeric"
                    placeholder="0"
                    onChange={(e) => setTbCounts((c) => ({ ...c, [String(d)]: e.target.value.replace(/\D/g, '') }))}
                  />
                  <span className="hn-mono" style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>× ${fmtMoney(d)}</span>
                  <span className="hn-mono" style={{ fontSize: '12.5px', textAlign: 'right' }}>${fmtMoney(count * d)}</span>
                </div>
              );
            })}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontWeight: 700, fontSize: '14px' }}>
              <span>Cash Total</span>
              <span className="hn-mono">${fmtMoney(cashTotal)}</span>
            </div>
          </div>

          {/* Tender reconciliation */}
          <div className="hn-us-card" style={{ padding: '16px' }}>
            <div className="hn-panel-title" style={{ marginBottom: '4px' }}>Tender Reconciliation</div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-faint)', marginBottom: '10px' }}>
              Expected cash includes the ${fmtMoney(TILL_FLOAT)} float.
            </div>
            <div className="hn-tb-tender" style={{ borderBottom: '1px solid var(--border)', fontFamily: 'Consolas, monospace', fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              <span>Tender</span><span style={{ textAlign: 'right' }}>Counted</span><span style={{ textAlign: 'right' }}>Expected</span><span style={{ textAlign: 'right' }}>Variance</span>
            </div>
            {TILL_TENDERS.map((t) => {
              const counted = countedFor(t);
              const v = counted - t.expected;
              return (
                <div key={t.id} className="hn-tb-tender">
                  <span>{t.label}{t.cashLinked && <span style={{ fontSize: '10.5px', color: 'var(--text-faint)' }}> · from cash count</span>}</span>
                  {t.cashLinked ? (
                    <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(counted)}</span>
                  ) : (
                    <input
                      className="hn-tb-input"
                      value={tbCounted[t.id]}
                      inputMode="decimal"
                      placeholder="0.00"
                      onChange={(e) => setTbCounted((c) => ({ ...c, [t.id]: e.target.value.replace(/[^0-9.]/g, '') }))}
                    />
                  )}
                  <span className="hn-mono" style={{ textAlign: 'right', color: 'var(--text-muted)' }}>${fmtMoney(t.expected)}</span>
                  <span className="hn-mono" style={{ textAlign: 'right', ...varianceStyle(v) }}>${fmtMoney(v)}</span>
                </div>
              );
            })}
            <div className="hn-tb-tender" style={{ borderTop: '1px solid var(--border)', borderBottom: 'none', marginTop: '4px', fontWeight: 700, fontSize: '14px' }}>
              <span>Final Total</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(totalCounted)}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(totalExpected)}</span>
              <span className="hn-mono" style={{ textAlign: 'right', ...varianceStyle(totalCounted - totalExpected) }}>${fmtMoney(totalCounted - totalExpected)}</span>
            </div>

            <div style={{ marginTop: '14px', padding: '10px 12px', borderRadius: '8px', background: 'var(--bg)', border: '1px dashed var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}>
              Cash Sales Refunds · Credit Notes · Invoice Refunds — shown in printout.
            </div>

            <button type="button" className="hn-btn-primary" style={{ marginTop: '14px', width: 'auto', padding: '10px 18px' }}
              onClick={() => setTbNotice('Till balance recorded — the printout and SAP posting will follow once the backend is wired up.')}>
              <Percent size={15} strokeWidth={2} /> Balance Till
            </button>
            {tbNotice && (
              <div style={{ marginTop: '10px', padding: '9px 12px', borderRadius: '8px', background: 'rgba(21,128,61,0.08)', border: '1px solid rgba(21,128,61,0.3)', fontSize: '12.5px', fontWeight: 500 }}>
                {tbNotice}
              </div>
            )}
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Cashiers Menu</span>
          <span>Float ${fmtMoney(TILL_FLOAT)}</span>
        </div>
      </main>
    );
  };

  // ---- 7 · CNP Transactions (Payment Requests) ----
  const cnpFiltered = CNP_REQUESTS.filter((r) => {
    const q = cnpQuery.trim().toLowerCase();
    if (!q) return true;
    return r.id.includes(q) || r.name.toLowerCase().includes(q) || r.payee.toLowerCase().includes(q) || r.requestor.toLowerCase().includes(q);
  });

  const renderCnpTransactions = () => {
    const selected = cnpFiltered.find((r) => r.id === cnpSel) || cnpFiltered[0] || null;
    const d = selected ? cnpDetail(selected) : null;
    const placeholder = (what) => setCnpNotice(`${what} will run against the live gateway once SAP is wired up — nothing was changed.`);

    const FIN_ROWS = d ? [
      { label: 'Invoice Total', value: d.fin.invoiceTotal },
      { label: 'Payments', value: d.fin.payments },
      { label: 'Total Booked Out', value: d.fin.bookedOut },
      { label: 'Total Undelivered', value: d.fin.undelivered },
      { label: 'Credit Notes O/S', value: d.fin.creditNotes },
      { label: 'Balance Owing', value: d.fin.balanceOwing },
      { label: 'Balance to Pay', value: d.fin.balanceToPay },
      { label: 'Delivery Fee', value: d.fin.deliveryFee },
      { label: 'Amount to Collect', value: d.fin.amountToCollect, highlight: true },
    ] : [];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>CNP Transactions</h1>
          <p className="hn-screen-sub" style={{ margin: '6px 0 0' }}>Card-not-present payment requests — sent to customers to pay remotely.</p>
        </div>

        <div className="hn-us-toolbar hn-fade-in">
          <div className="hn-us-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              className="hn-us-search-input hn-mono"
              placeholder="Filter by invoice #, name or requestor…"
              value={cnpQuery}
              onChange={(e) => setCnpQuery(e.target.value)}
            />
          </div>
          <div className="hn-us-actions">
            {['Summary', 'Refund', 'Cancel Request'].map((a) => (
              <button key={a} type="button" className="hn-us-action-btn" disabled={!selected} onClick={() => placeholder(a)}>{a}</button>
            ))}
          </div>
        </div>

        {cnpNotice && (
          <div className="hn-fade-in" style={{ marginBottom: '12px', padding: '9px 12px', borderRadius: '8px', background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.28)', fontSize: '12.5px', fontWeight: 500 }}>
            {cnpNotice}
          </div>
        )}

        <div className="hn-us-layout hn-fade-in">
          {/* LEFT — requests grid */}
          <div className="hn-us-main">
            <div className="hn-us-card">
              <div className="hn-oo-card-head">Payment Requests · Franchise 13660</div>
              <div className="hn-cnp-head">
                <span>Date</span><span>INV #</span><span>Invoice / Payee Name</span>
                <span style={{ textAlign: 'right' }}>Amount</span><span>Status</span><span>Requestor</span><span>Expiring</span>
              </div>
              <div style={{ maxHeight: '430px', overflowY: 'auto' }}>
                {cnpFiltered.map((r) => (
                  <button key={r.id} type="button" className={`hn-cnp-row ${selected && selected.id === r.id ? 'active' : ''}`} onClick={() => setCnpSel(r.id)}>
                    <span className="hn-mono">{r.date}</span>
                    <span className="hn-mono">{r.id}</span>
                    <span className="hn-us-ellip">{r.name}</span>
                    <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(r.amount)}</span>
                    <span><span className="hn-oo-dispatch pickup">{r.status}</span></span>
                    <span className="hn-us-ellip hn-mono">{r.requestor}</span>
                    <span className="hn-mono">{r.expiring}</span>
                  </button>
                ))}
                {cnpFiltered.length === 0 && <div className="hn-oo-empty">No payment requests match your filter.</div>}
              </div>
            </div>
          </div>

          {/* RIGHT — request detail */}
          <div className="hn-us-side">
            {selected && d ? (
              <>
                <div className="hn-us-card" style={{ padding: '16px' }}>
                  <div className="hn-panel-title" style={{ marginBottom: '10px' }}>
                    Invoice <span className="hn-mono">{selected.id}</span> · Payment Request
                  </div>
                  <div className="hn-cust-grid">
                    <div><span className="hn-detail-label">Status</span><span className="hn-detail-value">{selected.status}</span></div>
                    <div><span className="hn-detail-label">Amount</span><span className="hn-detail-value hn-mono">${fmtMoney(selected.amount)}</span></div>
                    <div><span className="hn-detail-label">Requested</span><span className="hn-detail-value hn-mono">{d.requested}</span></div>
                    <div><span className="hn-detail-label">Req #</span><span className="hn-detail-value hn-mono">{d.reqNo}</span></div>
                    <div><span className="hn-detail-label">Requestor</span><span className="hn-detail-value hn-mono">{selected.requestor}</span></div>
                    <div><span className="hn-detail-label">Expiring</span><span className="hn-detail-value hn-mono">{selected.expiring}</span></div>
                  </div>
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
                    <div className="hn-detail-label" style={{ marginBottom: '4px' }}>Payment Request Sent To</div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{d.sentTo.name} <span className="hn-mono" style={{ fontWeight: 400, color: 'var(--text-muted)' }}>· {d.sentTo.custNo} · {d.sentTo.postcode}</span></div>
                    {d.sentTo.phone && <div className="hn-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>P: {d.sentTo.phone}</div>}
                    {d.sentTo.email && <div className="hn-mono" style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px', wordBreak: 'break-all' }}>E: {d.sentTo.email}</div>}
                  </div>
                </div>

                <div className="hn-ledger-panel">
                  <div className="hn-panel-title" style={{ marginBottom: '10px' }}>
                    Financial Summary <span className="hn-mono" style={{ fontWeight: 400, color: 'var(--text-muted)' }}>· Raised {d.fin.raised} · {d.fin.saleType}</span>
                  </div>
                  <div className="hn-ledger-rows">
                    {FIN_ROWS.map((row) => (
                      <div key={row.label} className={`hn-ledger-row ${row.highlight ? 'hn-ledger-row-balance' : ''}`}>
                        <span className="hn-ledger-label">{row.label}</span>
                        <span className={`hn-ledger-value hn-mono ${row.highlight ? 'hn-ledger-value-balance' : ''}`}>${fmtMoney(row.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hn-us-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '10px' }}>
                    <div className="hn-panel-title" style={{ margin: 0 }}>Transaction Status</div>
                    <button type="button" className="hn-us-action-btn" onClick={() => placeholder('Query')}>Query</button>
                  </div>
                  <div className="hn-cust-grid">
                    <div><span className="hn-detail-label">Tran #</span><span className="hn-detail-value hn-mono">{d.tran.no}</span></div>
                    <div><span className="hn-detail-label">Last Query</span><span className="hn-detail-value hn-mono">{d.tran.query}</span></div>
                    <div><span className="hn-detail-label">Query Id / Count</span><span className="hn-detail-value hn-mono">{d.tran.queryId} · {d.tran.queryCount}</span></div>
                    <div><span className="hn-detail-label">Response Type</span><span className="hn-detail-value">{d.tran.respType}</span></div>
                    <div><span className="hn-detail-label">Successful</span><span className="hn-detail-value" style={{ color: d.tran.successful === 'False' ? '#B91C1C' : 'var(--success)', fontWeight: 600 }}>{d.tran.successful}</span></div>
                    <div><span className="hn-detail-label">Response Code</span><span className="hn-detail-value hn-mono">{d.tran.respCode}</span></div>
                    <div><span className="hn-detail-label">Instrument</span><span className="hn-detail-value">{d.tran.instrument}</span></div>
                    <div><span className="hn-detail-label">Amount</span><span className="hn-detail-value hn-mono">${fmtMoney(d.tran.amount)}</span></div>
                  </div>
                </div>
              </>
            ) : (
              <div className="hn-us-card"><div className="hn-oo-empty" style={{ padding: '24px' }}>Select a payment request to see its detail.</div></div>
            )}
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Cashiers Menu</span>
          <span>{cnpFiltered.length} payment request{cnpFiltered.length !== 1 ? 's' : ''}</span>
        </div>
      </main>
    );
  };

  // ---- Invoice Modification: detail view ----
  const renderInvoiceModifyDetail = () => {
    const inv = modifyInvoice;
    if (!inv) return null;
    const cust = customerForInvoice(inv);
    const fin = inv.financials || {};
    const opNum = inv.operator || operatorNumber;
    const opName = OPERATOR_NAMES[opNum] || null;

    const LEDGER = [
      { label: 'Invoice Total',     value: fin.invoiceTotal     || '$0.00', highlight: false },
      { label: 'Paid to Date',      value: fin.paidToDate       || '$0.00', highlight: false },
      { label: 'Finance Paid',      value: fin.financePaid      || '$0.00', highlight: false },
      { label: 'Goods Outstanding', value: fin.goodsOutstanding || '$0.00', highlight: false },
      { label: 'Outstanding Debt',  value: fin.outstandingDebt  || '$0.00', highlight: false },
      { label: 'Balance Owing',     value: fin.balanceOwing     || '$0.00', highlight: true  },
    ];

    return (
      <main className="hn-screen">
        {/* Header */}
        <div className="hn-fade-in" style={{ marginBottom: '20px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>
              Invoice <span className="hn-mono">{inv.id}</span>
            </h1>
            <span style={{
              fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px',
              background: inv.status === 'Delivered' ? 'rgba(21,128,61,0.1)' : 'rgba(217,119,6,0.1)',
              color:      inv.status === 'Delivered' ? 'var(--success)'       : '#B45309',
            }}>
              {inv.status}
            </span>
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '5px' }}>
            Raised {inv.date}
            {opName
              ? <> · <span style={{ fontWeight: 500 }}>{opName}</span> <span className="hn-mono">(OP {opNum})</span></>
              : <> · <span className="hn-mono">OP {opNum}</span></>}
          </div>
        </div>

        {/* Two-column layout: ledger sidebar + customer/detail panel */}
        <div className="hn-modify-layout hn-fade-in">

          {/* LEFT — financial ledger */}
          <div className="hn-ledger-panel">
            <div className="hn-panel-title" style={{ marginBottom: '14px' }}>Financial Summary</div>
            <div className="hn-ledger-rows">
              {LEDGER.map((row) => (
                <div
                  key={row.label}
                  className={`hn-ledger-row ${row.highlight ? 'hn-ledger-row-balance' : ''}`}
                >
                  <span className="hn-ledger-label">{row.label}</span>
                  <span className={`hn-ledger-value hn-mono ${row.highlight ? 'hn-ledger-value-balance' : ''}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — customer info + notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
            {/* Customer */}
            <div className="hn-panel">
              <div className="hn-panel-title">Customer</div>
              {cust ? (
                <>
                  <div className="hn-cust-name" style={{ fontSize: '20px', marginBottom: '12px' }}>
                    {cust.firstName} {cust.lastName}
                  </div>
                  <div className="hn-cust-grid">
                    <div><span className="hn-detail-label">Customer No.</span><span className="hn-detail-value hn-mono">{cust.id}</span></div>
                    <div><span className="hn-detail-label">Phone</span><span className="hn-detail-value hn-mono">{cust.mobile || cust.phone || '—'}</span></div>
                    <div><span className="hn-detail-label">House address</span><span className="hn-detail-value">{cust.address || '—'}</span></div>
                    <div><span className="hn-detail-label">Delivery address</span><span className="hn-detail-value">{cust.deliveryAddress || cust.address || '—'}</span></div>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Customer not found.</div>
              )}
            </div>

            {/* Notes */}
            {inv.notes ? (
              <div className="hn-panel">
                <div className="hn-panel-title">Invoice Notes</div>
                <div className="hn-notes-preview">{inv.notes}</div>
              </div>
            ) : null}

            {/* Items placeholder */}
            <div className="hn-items">
              <div className="hn-items-empty">
                <div style={{ fontSize: '14px', fontWeight: 500 }}>Line items not connected yet</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '3px' }}>
                  Individual line items will appear here once SAP is wired up.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back · Loaded via <kbd className="hn-kbd-inline">⌥I</kbd> Invoice Lookup (Modify mode)</span>
        </div>
      </main>
    );
  };

  const renderInvoiceSearch = () => (
    <main className="hn-screen" style={{ maxWidth: '600px' }}>
      <div className="hn-fade-in" style={{ marginBottom: '24px' }}>
        <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
        <h1 className="hn-serif hn-screen-title">Find a customer</h1>
        <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
          Search by phone or house address — you only need one. Press <kbd className="hn-kbd-inline">↵</kbd> to move between fields and to search.
        </p>
      </div>
      <div
        className="hn-card hn-fade-in"
        style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        onKeyDown={(e) => handleEnterAdvance(e, runCustomerSearch)}
      >
        <div>
          <label className="hn-field-label">Operator Number</label>
          <input
            ref={invoiceOperatorRef}
            className="hn-input hn-mono"
            inputMode="numeric"
            maxLength={4}
            value={invoiceOperator}
            onChange={(e) => setInvoiceOperator(e.target.value.replace(/\D/g, '').slice(0, 4))}
          />
          <span className="hn-field-hint">Defaults to you ({operatorNumber}). Type another operator number to switch — no password needed.</span>
        </div>
        <div>
          <label className="hn-field-label">Customer Phone Number</label>
          <input
            className="hn-input hn-mono"
            inputMode="tel"
            placeholder="e.g. 0412 884 219"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            // Either phone or address alone is enough to search, so a filled
            // phone field searches immediately on Enter instead of advancing.
            data-enter-skip={searchPhone.trim() ? 'true' : 'false'}
            onKeyDown={(e) => { if (e.key === 'Enter' && searchPhone.trim()) { e.preventDefault(); runCustomerSearch(); } }}
          />
        </div>
        <div>
          <label className="hn-field-label">House Address</label>
          <input
            className="hn-input"
            placeholder="e.g. 15 Tarneit Rd, Werribee"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            data-enter-submit="true"
          />
        </div>
        <button
          type="button"
          className="hn-btn-primary"
          onClick={runCustomerSearch}
          disabled={!searchPhone.trim() && !searchAddress.trim()}
        >
          <Search size={15} strokeWidth={2} /> Search customer
        </button>
      </div>
      <div className="hn-screen-footer">
        <span><LiveClock type="date" /></span>
        <span><kbd className="hn-kbd-inline">Esc</kbd> Back to Salesperson Menu</span>
      </div>
    </main>
  );

  const renderCreateCustomer = () => (
    <CreateCustomerScreen
      prefill={createPrefill || {}}
      breadcrumb={breadcrumb}
      onCreate={createCustomerAndOpenInvoice}
      onCancel={cancelCreate}
    />
  );

  // ─── Manual Purchase Request (photo 4) ────────────────────────────────────
  // ─── Cash Sale (photo 1) ──────────────────────────────────────────────────
  const renderCashSale = () => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dateStr = `${dd}/${mm}/${now.getFullYear()}`;
    const timeStr = now.toLocaleTimeString('en-AU', { hour12: false });
    const opName = OPERATOR_NAMES[operatorNumber] || 'Operator';
    const opFirst = opName.split(' ')[0];
    const saleTotal = csLines.reduce((a, l) => a + l.price * l.qty + (l.onlinePrice || 0) * l.qty, 0);

    const addProduct = () => {
      const q = csProduct.trim().toLowerCase();
      const pool = MOCK_CATALOGUE;
      const p = q
        ? pool.find((x) => x.code.toLowerCase().includes(q) || x.description.toLowerCase().includes(q)) || pool[0]
        : pool[csLines.length % pool.length];
      const qty = Math.max(1, parseInt(csQty, 10) || 1);
      setCsLines((ls) => [...ls, {
        id: `${Date.now()}-${ls.length}`, code: p.code, desc: p.description, dept: p.dept,
        qty, price: Math.round(p.sellIncl * 100) / 100,
        batch: `000${p.dept}${Math.floor(100000 + Math.random() * 899999)}`,
        onlinePrice: p.bestSellSrc === 'Online' ? -Math.round((p.sellIncl - p.bestSell) * 100) / 100 : 0,
        warranty: 12,
      }]);
      setCsProduct(''); setCsQty('1');
    };
    const voidLine = (id) => setCsLines((ls) => ls.filter((l) => l.id !== id));

    const FKEYS_TOP = ['F2 = Modify', 'Alt+F3 = Inv Notes', 'F6 = Groups', 'F3 = Order Detail'];
    const FKEYS_BOT = ['Esc / F10 = Void', 'F7 = Suspend', 'F11 = Tape', 'Enter = Total'];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
            <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Cash Sale</h1>
          </div>
          <div className="hn-cs-saleno hn-mono">{csSaleNo}</div>
        </div>

        <div className="hn-cs-layout hn-fade-in">
          {/* LEFT: entry form */}
          <div className="hn-cs-form">
            <div className="hn-cs-field">
              <label className="hn-field-label">Customer Number</label>
              <input className="hn-input hn-mono" value={csCustomer} onChange={(e) => setCsCustomer(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="Customer no." inputMode="numeric" />
            </div>
            <div className="hn-cs-field">
              <label className="hn-field-label">Customer PostCode</label>
              <input className="hn-input hn-mono" value={csPostcode} onChange={(e) => setCsPostcode(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="0000" inputMode="numeric" style={{ maxWidth: '120px' }} />
            </div>
            <div className="hn-cs-field" style={{ marginTop: '8px' }}>
              <label className="hn-field-label" style={{ color: 'var(--accent)' }}>Enter Product</label>
              <div className="hn-mpr-supwrap">
                <input
                  className="hn-input hn-mono"
                  value={csProduct}
                  onChange={(e) => setCsProduct(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addProduct(); } }}
                  placeholder="Scan or type code…"
                />
                <button type="button" className="hn-cs-f4" onClick={() => setBrowseOpen(true)}>F4 = Search</button>
              </div>
            </div>
            <div className="hn-cs-field">
              <label className="hn-field-label">Quantity</label>
              <input className="hn-input hn-mono" value={csQty} onChange={(e) => setCsQty(e.target.value.replace(/\D/g, '').slice(0, 3))} inputMode="numeric" style={{ maxWidth: '120px' }} />
            </div>
            <button type="button" className="hn-btn-primary" style={{ width: 'auto', padding: '0 18px', marginTop: '6px' }} onClick={addProduct}>
              Add to Sale <span className="hn-mono" style={{ fontSize: '11px', opacity: 0.8, marginLeft: '6px' }}>↵</span>
            </button>

            <div className="hn-cs-fkeys">
              {[...FKEYS_TOP, ...FKEYS_BOT].map((k) => <span key={k} className="hn-mpr-fkey hn-mono">{k}</span>)}
            </div>
          </div>

          {/* RIGHT: live tape / receipt */}
          <div className="hn-cs-tape">
            <div className="hn-cs-tape-head hn-mono">
              <div>{dateStr}&nbsp;&nbsp;{timeStr}&nbsp;&nbsp;M&nbsp;&nbsp;136&nbsp;&nbsp;{csSaleNo}</div>
              <div style={{ marginTop: '10px' }}>Assistant : {operatorNumber}/422 {opFirst.toUpperCase()}</div>
              <div>Operator&nbsp;&nbsp;: {operatorNumber}/422 {opFirst}</div>
              <div>Customer #: {csCustomer || '—'}</div>
              <div>Sales Type: CASH – CASH SALE</div>
              <div className="hn-cs-tape-rule" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>TAX INVOICE</span><span>CASH SALE</span></div>
            </div>

            <div className="hn-cs-tape-body hn-mono">
              {csLines.length === 0 ? (
                <div className="hn-cs-tape-empty">No items yet — enter a product to begin.</div>
              ) : csLines.map((l) => (
                <div key={l.id} className="hn-cs-tape-line">
                  <div className="hn-cs-tape-name">
                    {l.desc}
                    <button type="button" className="hn-cs-void" onClick={() => voidLine(l.id)} title="Void line (F10)"><X size={12} strokeWidth={2.5} /></button>
                  </div>
                  <div className="hn-cs-tape-kv"><span>Quantity:</span><span>{l.qty}</span></div>
                  <div className="hn-cs-tape-kv"><span>Price:</span><span>${fmtMoney(l.price)}</span></div>
                  <div className="hn-cs-tape-kv"><span>Dept.Code:</span><span>{l.dept}</span></div>
                  <div className="hn-cs-tape-kv"><span>Product Code:</span><span>{l.code}</span></div>
                  <div className="hn-cs-tape-kv"><span>Batch Number:</span><span>{l.batch}</span></div>
                  {l.onlinePrice ? (
                    <div className="hn-cs-tape-kv"><span>ONLINE PRICE:</span><span>-${fmtMoney(Math.abs(l.onlinePrice))}</span></div>
                  ) : null}
                  <div className="hn-cs-tape-warr">
                    <div>Warranty Information</div>
                    <div>------------------------</div>
                    <div>Manufacturer Warranty of {l.warranty} Months</div>
                    <div>See Manufacturers documentation for</div>
                    <div>Warranty Details.</div>
                  </div>
                  <div className="hn-cs-tape-kv" style={{ fontWeight: 700 }}><span>Item Total:</span><span>${fmtMoney((l.price + (l.onlinePrice || 0)) * l.qty)}</span></div>
                  <div className="hn-cs-tape-rule" />
                </div>
              ))}
            </div>

            <div className="hn-cs-tape-total">
              <span>Sale Total</span>
              <span className="hn-mono">${fmtMoney(saleTotal)}</span>
            </div>
          </div>
        </div>

        <div className="hn-mpr-status hn-mono hn-fade-in">
          Store 01 · 136 <span className="hn-divider-dot" /> Terminal 422 Open <span className="hn-divider-dot" /> IP 10.15.100.114 <span className="hn-divider-dot" /> Version 2026.10.7926.0 <span className="hn-divider-dot" /> EOD 23:00:00
        </div>
      </main>
    );
  };

  // ─── Barcode Label Printing (no reference photo — sensible interpretation) ─
  const renderBarcodePrint = () => {
    const FORMATS = ['Shelf Label (Small)', 'Shelf Label (Large)', 'Ticket A6', 'Promo Ticket A5', 'Bin Label'];
    const addToQueue = () => {
      const q = blProduct.trim().toLowerCase();
      if (!q) return;
      const p = MOCK_CATALOGUE.find((x) => x.code.toLowerCase().includes(q) || x.description.toLowerCase().includes(q));
      if (!p) return;
      setBlQueue((qq) => [...qq, { id: `${Date.now()}`, code: p.code, desc: p.description, price: p.sellIncl, count: Math.max(1, parseInt(blCount, 10) || 1), format: blFormat }]);
      setBlProduct(''); setBlCount('1');
    };
    const removeQ = (id) => setBlQueue((qq) => qq.filter((x) => x.id !== id));
    const totalLabels = blQueue.reduce((a, x) => a + x.count, 0);

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Barcode Label Printing</h1>
          <p className="hn-screen-sub" style={{ margin: '6px 0 0' }}>Add products to the print queue, choose a label format, then send to the label printer.</p>
        </div>

        <div className="hn-bl-form hn-fade-in">
          <div className="hn-cs-field" style={{ flex: 2, minWidth: '240px' }}>
            <label className="hn-field-label" style={{ color: 'var(--accent)' }}>Product</label>
            <div className="hn-mpr-supwrap">
              <input className="hn-input hn-mono" value={blProduct} onChange={(e) => setBlProduct(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addToQueue(); } }} placeholder="Scan or type code…" />
              <button type="button" className="hn-cs-f4" onClick={() => setBrowseOpen(true)}>F4 = Search</button>
            </div>
          </div>
          <div className="hn-cs-field" style={{ maxWidth: '110px' }}>
            <label className="hn-field-label"># Labels</label>
            <input className="hn-input hn-mono" value={blCount} onChange={(e) => setBlCount(e.target.value.replace(/\D/g, '').slice(0, 3))} inputMode="numeric" />
          </div>
          <div className="hn-cs-field" style={{ minWidth: '200px' }}>
            <label className="hn-field-label">Label Format</label>
            <select className="hn-input hn-mono" value={blFormat} onChange={(e) => setBlFormat(e.target.value)}>
              {FORMATS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          <button type="button" className="hn-us-action-btn" style={{ alignSelf: 'flex-end', height: '40px' }} onClick={addToQueue}>+ Add to Queue</button>
        </div>

        <div className="hn-oo-card hn-fade-in" style={{ marginTop: '16px' }}>
          <div className="hn-oo-card-head" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Print Queue</span>
            <span className="hn-mono" style={{ fontWeight: 400 }}>{totalLabels} label{totalLabels === 1 ? '' : 's'}</span>
          </div>
          <div className="hn-bl-grid-head">
            <span>Product Code</span><span>Description</span><span style={{ textAlign: 'right' }}>Price</span><span>Format</span><span style={{ textAlign: 'right' }}>Qty</span><span />
          </div>
          {blQueue.length === 0 ? (
            <div className="hn-browse-empty" style={{ margin: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>Queue is empty</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>Add a product above to build a batch of labels.</div>
            </div>
          ) : blQueue.map((x) => (
            <div key={x.id} className="hn-bl-grid-row">
              <span className="hn-mono" style={{ fontWeight: 600 }}>{x.code}</span>
              <span className="hn-prod-name">{x.desc}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(x.price)}</span>
              <span style={{ color: 'var(--text-muted)' }}>{x.format}</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>{x.count}</span>
              <button type="button" className="hn-mpr-del" onClick={() => removeQ(x.id)}><X size={13} strokeWidth={2} /></button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
          <button type="button" className="hn-btn-primary" style={{ width: 'auto', padding: '0 20px' }} disabled={!blQueue.length}>
            <ScanBarcode size={16} strokeWidth={1.9} /> Print {totalLabels || ''} Label{totalLabels === 1 ? '' : 's'}
          </button>
          <button type="button" className="hn-us-action-btn" disabled={!blQueue.length} onClick={() => setBlQueue([])}>Clear Queue</button>
        </div>
      </main>
    );
  };

  // ─── All Insurance Invoices (photo 2) ─────────────────────────────────────
  const renderInsuranceInvoices = () => {
    const COLS = ['Claim No', 'Delivery Name', 'Assessor', 'Insurance Comp', 'Date', 'Order No', 'SO_QU…', 'SO_NAME', 'SO_ADD1', 'SO_ADD2', 'SO_ADD3'];
    const ACTIONS = ['Change', 'View', 'Search', 'Summary', 'Detail', 'Reprint'];
    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '16px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>All Insurance Invoices</h1>
        </div>

        <div className="hn-ins-searchbar hn-fade-in">
          <div className="hn-cs-field" style={{ maxWidth: '260px' }}>
            <label className="hn-field-label">Claim No</label>
            <input className="hn-input hn-mono" value={insClaim} onChange={(e) => setInsClaim(e.target.value)} placeholder="Enter claim number…" />
          </div>
          <div className="hn-us-actions" style={{ alignSelf: 'flex-end' }}>
            {ACTIONS.map((a) => <button key={a} type="button" className="hn-us-action-btn">{a}</button>)}
          </div>
        </div>

        <div className="hn-oo-card hn-fade-in" style={{ marginTop: '16px' }}>
          <div className="hn-ins-grid-head">
            {COLS.map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className="hn-ins-empty">
            <ShieldCheck size={30} strokeWidth={1.3} style={{ color: 'var(--text-faint)' }} />
            <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '10px' }}>No insurance invoices to display</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '3px' }}>Enter a Claim No and press Search to look up insurance invoices.</div>
          </div>
        </div>

        <div className="hn-mpr-status hn-mono hn-fade-in">
          <kbd className="hn-kbd-inline">Esc</kbd> Exit <span className="hn-divider-dot" /> Store 01 · 136 <span className="hn-divider-dot" /> Terminal 422 Open <span className="hn-divider-dot" /> IP 10.15.100.114
        </div>
      </main>
    );
  };

  // ─── Incoming EDI Orders (photo 3) ────────────────────────────────────────
  const renderEdiOrders = () => {
    const COLS = ['Appr', 'Order Number', 'Order Date', 'Description', 'Order Type', 'Order Total', 'Customer / Business Name', 'Customer Number', 'Invoice Number', 'Order Status', 'Processed Date', 'Processed Time'];
    const PROD_COLS = ['Department', 'Product', 'Description', 'Qty', 'Order Price', 'Order Line#', 'Not Before', 'Not After'];
    const ACTIONS = ['Search', 'Approve Order', 'Cancel Order', 'Approve All Orders', 'Invoice Order(s)', 'F4 = Product Browse', 'Customer Detail'];
    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '16px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Incoming EDI Orders</h1>
        </div>

        <div className="hn-edi-searchbar hn-fade-in">
          <div className="hn-cs-field" style={{ maxWidth: '220px' }}>
            <label className="hn-field-label">Order Number</label>
            <input className="hn-input hn-mono" value={ediOrderNo} onChange={(e) => setEdiOrderNo(e.target.value)} placeholder="Order no…" />
          </div>
          <div className="hn-cs-field" style={{ maxWidth: '220px' }}>
            <label className="hn-field-label">Customer #</label>
            <input className="hn-input hn-mono" value={ediCustomer} onChange={(e) => setEdiCustomer(e.target.value)} placeholder="Customer no…" />
          </div>
          <label className="hn-edi-check">
            <input type="checkbox" checked={ediShowProcessed} onChange={(e) => setEdiShowProcessed(e.target.checked)} />
            Show Processed Orders
          </label>
        </div>

        <div className="hn-oo-card hn-fade-in" style={{ marginTop: '16px' }}>
          <div className="hn-oo-card-head">EDI Orders</div>
          <div className="hn-edi-grid-head">
            {COLS.map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className="hn-ins-empty">
            <MailPlus size={30} strokeWidth={1.3} style={{ color: 'var(--text-faint)' }} />
            <div style={{ fontSize: '14px', fontWeight: 500, marginTop: '10px' }}>No incoming EDI orders</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '3px' }}>New electronic orders will appear here for approval and invoicing.</div>
          </div>
        </div>

        <div className="hn-oo-card hn-fade-in" style={{ marginTop: '14px' }}>
          <div className="hn-oo-card-head">Products On Order</div>
          <div className="hn-ediprod-grid-head">
            {PROD_COLS.map((c) => <span key={c}>{c}</span>)}
          </div>
          <div className="hn-ins-empty" style={{ minHeight: '120px' }}>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>Select an order above to see its line items.</div>
          </div>
        </div>

        <div className="hn-us-actions hn-fade-in" style={{ marginTop: '14px' }}>
          {ACTIONS.map((a) => <button key={a} type="button" className="hn-us-action-btn">{a}</button>)}
        </div>
      </main>
    );
  };

  // ─── Product Care Orders (photo 4) ────────────────────────────────────────
  const renderProductCareOrders = () => {
    const rows = PCO_ORDERS.filter((o) => {
      const q = pcoName.trim().toLowerCase();
      if (!q) return true;
      return o.surname.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.custNo.includes(q);
    });
    const sel = PCO_ORDERS.find((o) => o.id === pcoSelected) || PCO_ORDERS[0];
    const ACTIONS_1 = ['Search', 'Change Product', 'Add Bonus', 'Generate Tax Invoice', 'Edit Data', 'Tag Detail', 'Shipped'];
    const ACTIONS_2 = ['Confirm Cancel Order', 'Modify Sales Order', 'Reprint', 'Tag Header', 'Pick Slip', 'Reprint PL', 'Delete PL', 'Find / Match Customer'];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '14px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Product Care Orders</h1>
        </div>

        {/* Search + filters */}
        <div className="hn-pco-searchbar hn-fade-in">
          <div className="hn-pco-search">
            <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input className="hn-us-search-input hn-mono" placeholder="Search by name, order # or customer #…" value={pcoName} onChange={(e) => setPcoName(e.target.value)} />
          </div>
          <div className="hn-pco-filters">
            <span className="hn-pco-fchip">Order Type: <strong>Product Care Order</strong></span>
            <span className="hn-pco-fchip">Movex: <strong>L3M</strong></span>
            <span className="hn-pco-fchip">User: <strong>All Users</strong></span>
            <span className="hn-pco-fchip">Sales Type: <strong>ALL</strong></span>
            <label className="hn-pco-fchip">Status:&nbsp;
              <select value={pcoStatus} onChange={(e) => setPcoStatus(e.target.value)} className="hn-pco-select">
                <option>Open Orders</option><option>Completed</option><option>Cancelled</option><option>All</option>
              </select>
            </label>
          </div>
        </div>

        <div className="hn-pco-layout hn-fade-in">
          {/* Orders grid */}
          <div className="hn-oo-card" style={{ minWidth: 0 }}>
            <div className="hn-oo-card-head">Orders</div>
            <div className="hn-pco-grid-wrap">
              <div className="hn-pco-grid-head">
                <span>Status</span><span>Order Number</span><span>Created</span><span style={{ textAlign: 'right' }}>Total</span>
                <span style={{ textAlign: 'right' }}>Del Fee</span><span style={{ textAlign: 'right' }}>Approved</span><span>Approval #</span><span>Customer #</span><span>Surname</span><span>Deliver</span>
              </div>
              {rows.map((o) => (
                <div key={o.id} className={`hn-pco-grid-row ${pcoSelected === o.id ? 'active' : ''}`} onClick={() => setPcoSelected(o.id)}>
                  <span><span className="hn-pco-status">New</span></span>
                  <span className="hn-mono" style={{ fontWeight: 600 }}>{o.id}</span>
                  <span className="hn-mono" style={{ color: 'var(--text-muted)' }}>{o.created}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(o.total)}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>{o.delFee ? `$${fmtMoney(o.delFee)}` : '—'}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(o.approved)}</span>
                  <span className="hn-mono">{o.apprNo}</span>
                  <span className="hn-mono">{o.custNo}</span>
                  <span>{o.surname}</span>
                  <span><span className={`hn-oo-dispatch ${o.deliver === 'Pickup' ? 'pickup' : 'delivery'}`}>{o.deliver}</span></span>
                </div>
              ))}
            </div>

            {/* Order items + inventory */}
            <div className="hn-oo-card-head" style={{ marginTop: '14px' }}>Product Care Order Items</div>
            <div className="hn-pco-items-head">
              <span>Product</span><span>Description</span><span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>Total</span><span>Dept</span>
            </div>
            <div className="hn-pco-items-row">
              <span className="hn-mono" style={{ fontWeight: 600 }}>STORECREDIT_061</span>
              <span>STORECREDIT_061</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>1.00</span>
              <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(sel.total)}</span>
              <span className="hn-mono">061</span>
            </div>

            <div className="hn-pco-bottom">
              <div className="hn-pco-inv">
                <div className="hn-pco-sec">Inventory</div>
                {[['Stock On Hand', '0.00'], ['Stock On Order', '0.00'], ['Customer Orders', '0.00'], ['N/A for Sale', '0.00'], ['Total Available for Sale', '0.00']].map(([k, v]) => (
                  <div key={k} className="hn-pco-inv-row"><span>{k}</span><span className="hn-mono">{v}</span></div>
                ))}
              </div>
              <div className="hn-pco-notes">
                <div className="hn-pco-sec">Order Notes</div>
                <div className="hn-pco-note-box">{sel.orderNotes || '—'}</div>
                <div className="hn-pco-sec" style={{ marginTop: '10px' }}>Delivery Info</div>
                <div className="hn-pco-note-box">N/A</div>
              </div>
            </div>
          </div>

          {/* Right detail panel */}
          <aside className="hn-pco-detail">
            <div className="hn-pco-sec">Invoice Customer</div>
            <div className="hn-pco-invcust">{sel.invCust}</div>
            <div className="hn-pco-matched hn-mono">Matched by customer# {sel.billing.no}.</div>

            <div className="hn-pco-sec" style={{ marginTop: '12px' }}>Order Details</div>
            <div className="hn-pra-detrow">
              <PmvSpec label="Status" value="New" mono={false} />
              <PmvSpec label="Sales Type" value={sel.salesType} mono={false} />
              <PmvSpec label="Payment" value={sel.payType} mono={false} />
            </div>
            <div className="hn-pra-detrow">
              <PmvSpec label="Order Created" value={sel.created} />
              <PmvSpec label="Sales Order" value="Not Generated" mono={false} />
              <PmvSpec label="Total Delivery" value={`$${fmtMoney(sel.delFee || 0)}`} />
            </div>

            <div className="hn-pco-two">
              <div>
                <div className="hn-pco-sec">Delivery Customer</div>
                <div className="hn-pco-addr">
                  <div style={{ fontWeight: 600 }}>{sel.delivery.name}</div>
                  <div>{sel.delivery.a1}</div>
                  <div>{sel.delivery.a2}</div>
                  <div className="hn-pco-email">{sel.delivery.email}</div>
                </div>
              </div>
              <div>
                <div className="hn-pco-sec">Billing Customer</div>
                <div className="hn-pco-addr">
                  <div className="hn-mono">{sel.billing.no}</div>
                  <div style={{ fontWeight: 600 }}>{sel.billing.name}</div>
                  <div>{sel.billing.a1}</div>
                  <div>{sel.billing.a2}</div>
                  <div className="hn-pco-email">{sel.billing.email}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Action footer */}
        <div className="hn-pco-actions hn-fade-in">
          {[...ACTIONS_1, ...ACTIONS_2].map((a) => <button key={a} type="button" className="hn-us-action-btn">{a}</button>)}
        </div>
      </main>
    );
  };


  const renderManualPR = () => {
    const reqNo = '247974';
    const subtotal = prLines.reduce((a, l) => a + l.qty * l.cost, 0);
    const addSampleLine = () => {
      // Pull a product from the catalogue to stand in for an F4 search add.
      const pool = MOCK_CATALOGUE;
      const p = pool[prLines.length % pool.length];
      setPrLines((ls) => [...ls, {
        id: `${Date.now()}-${ls.length}`, code: p.code, desc: p.description, dept: p.dept,
        qty: 1, cost: Math.round(p.buyEx * 100) / 100,
      }]);
    };
    const removeLine = (id) => setPrLines((ls) => ls.filter((l) => l.id !== id));
    const setQty = (id, v) => setPrLines((ls) => ls.map((l) => l.id === id ? { ...l, qty: Math.max(0, parseInt(v, 10) || 0) } : l));

    const FKEYS = ['Esc = Exit', 'F2 = Change Line', 'F4 = Search', 'F8 = Total', 'F10 = Void', 'F11 = Tape', 'F7 = Suspend'];

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Manual Purchase Request</h1>
          <p className="hn-screen-sub" style={{ margin: '6px 0 0' }}>New purchase order — enter a supplier, then add product lines.</p>
        </div>

        {/* Header: request # + supplier */}
        <div className="hn-mpr-head hn-fade-in">
          <div className="hn-mpr-field">
            <label className="hn-field-label">Purchase Request #</label>
            <div className="hn-mpr-req hn-mono">{reqNo}</div>
          </div>
          <div className="hn-mpr-field">
            <label className="hn-field-label" style={{ color: 'var(--accent)' }}>Supplier Number</label>
            <div className="hn-mpr-supwrap">
              <input
                className="hn-input hn-mono"
                style={{ paddingLeft: '12px' }}
                value={prSupplier}
                onChange={(e) => setPrSupplier(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Supplier no."
                inputMode="numeric"
              />
              <span className="hn-mpr-f4">F4 = List</span>
            </div>
          </div>
          <div className="hn-mpr-field" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="hn-us-action-btn" onClick={addSampleLine}>+ Add Product Line (F4)</button>
          </div>
        </div>

        {/* Line grid */}
        <div className="hn-oo-card hn-fade-in" style={{ marginTop: '16px' }}>
          <div className="hn-oo-card-head">Order Lines</div>
          <div className="hn-mpr-grid-head">
            <span>Product Code</span><span>Description</span><span style={{ textAlign: 'center' }}>Dept</span>
            <span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>Cost</span>
            <span style={{ textAlign: 'right' }}>Line Total</span><span />
          </div>
          {prLines.length === 0 ? (
            <div className="hn-browse-empty" style={{ margin: '10px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>No lines yet</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>Press F4 or the Add button to add a product.</div>
            </div>
          ) : prLines.map((l) => (
            <div key={l.id} className="hn-mpr-grid-row">
              <span className="hn-mono" style={{ fontWeight: 600 }}>{l.code}</span>
              <span className="hn-prod-name">{l.desc}</span>
              <span className="hn-mono" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{l.dept}</span>
              <input className="hn-mpr-qty hn-mono" value={l.qty} onChange={(e) => setQty(l.id, e.target.value)} inputMode="numeric" />
              <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(l.cost)}</span>
              <span className="hn-mono" style={{ textAlign: 'right', fontWeight: 600 }}>${fmtMoney(l.qty * l.cost)}</span>
              <button type="button" className="hn-mpr-del" onClick={() => removeLine(l.id)} title="Void line (F10)"><X size={13} strokeWidth={2} /></button>
            </div>
          ))}
        </div>

        {/* Subtotal + function keys */}
        <div className="hn-mpr-foot hn-fade-in">
          <div className="hn-mpr-fkeys">
            {FKEYS.map((k) => <span key={k} className="hn-mpr-fkey hn-mono">{k}</span>)}
          </div>
          <div className="hn-mpr-subtotal">
            <span>Sub Total</span>
            <span className="hn-mono">${fmtMoney(subtotal)}</span>
          </div>
        </div>

        <div className="hn-mpr-status hn-mono hn-fade-in">
          Store 01 · 136 <span className="hn-divider-dot" /> Terminal 422 Open <span className="hn-divider-dot" /> IP 10.15.100.114 <span className="hn-divider-dot" /> <LiveClock type="date" /> <LiveClock />
        </div>
      </main>
    );
  };

  // ─── Purchase Request and Approvals (photo 3) ─────────────────────────────
  const praDetail = (row) => {
    if (row.detail) return row.detail;
    // r2 shares r1's product (EM300)
    const same = PRA_REQUESTS.find((r) => r.code === row.code && r.detail);
    return same ? same.detail : {};
  };

  const renderPrApprovals = () => {
    const rows = PRA_REQUESTS.filter((r) => {
      const q = praFilter.trim().toLowerCase();
      if (!q) return true;
      return r.code.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.supplier.includes(q);
    });
    const selected = PRA_REQUESTS.find((r) => r.id === praSelected) || PRA_REQUESTS[0];
    const d = praDetail(selected);

    const tally = (status) => {
      const list = PRA_REQUESTS.filter((r) => praStatus[r.id] === status);
      return { qty: list.reduce((a, r) => a + r.qty, 0), value: list.reduce((a, r) => a + r.qty * r.cost, 0) };
    };
    const pending = tally('pending'), approved = tally('approved'), declined = tally('declined');

    const setStatus = (id, s) => setPraStatus((m) => ({ ...m, [id]: s }));
    const setAll = (s) => setPraStatus(() => Object.fromEntries(PRA_REQUESTS.map((r) => [r.id, s])));

    const statusPill = (s) => (
      <span className={`hn-pra-pill ${s}`}>{s === 'pending' ? 'Pending' : s === 'approved' ? 'Approved' : 'Declined'}</span>
    );

    return (
      <main className="hn-screen hn-screen-wide">
        <div className="hn-fade-in" style={{ marginBottom: '16px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Purchase Request and Approvals</h1>
        </div>

        {/* Summary + actions */}
        <div className="hn-pra-top hn-fade-in">
          <div className="hn-pra-summary">
            <div className="hn-pra-sum-cell pending"><span>Pending</span><span className="hn-mono">{pending.qty.toFixed(2)}</span><span className="hn-mono">${fmtMoney(pending.value)}</span></div>
            <div className="hn-pra-sum-cell approved"><span>Approved</span><span className="hn-mono">{approved.qty.toFixed(2)}</span><span className="hn-mono">${fmtMoney(approved.value)}</span></div>
            <div className="hn-pra-sum-cell declined"><span>Declined</span><span className="hn-mono">{declined.qty.toFixed(2)}</span><span className="hn-mono">${fmtMoney(declined.value)}</span></div>
          </div>
          <div className="hn-pra-actions">
            <div className="hn-pra-search">
              <Search size={14} strokeWidth={1.75} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <input className="hn-us-search-input hn-mono" placeholder="Filter and press Enter…" value={praFilter} onChange={(e) => setPraFilter(e.target.value)} />
            </div>
            <button type="button" className="hn-pra-btn approve" onClick={() => setStatus(selected.id, 'approved')}>Approve</button>
            <button type="button" className="hn-pra-btn decline" onClick={() => setStatus(selected.id, 'declined')}>Decline</button>
            <button type="button" className="hn-pra-btn" onClick={() => setAll('approved')}>Approve All</button>
            <button type="button" className="hn-pra-btn" onClick={() => setAll('declined')}>Decline All</button>
            <button type="button" className="hn-pra-btn generate">Generate Orders</button>
          </div>
        </div>

        {/* Master grid + detail panel */}
        <div className="hn-pra-layout hn-fade-in">
          <div className="hn-oo-card" style={{ minWidth: 0 }}>
            <div className="hn-oo-card-head">Purchase Order Requests</div>
            <div className="hn-pra-grid-wrap">
              <div className="hn-pra-grid-head">
                <span>Status</span><span>Supplier</span><span>Dept</span><span>Product Code</span><span>Description</span>
                <span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>Cost</span><span>Deliver To</span><span>Src</span><span style={{ textAlign: 'right' }}>Request#</span>
              </div>
              {rows.map((r) => (
                <div
                  key={r.id}
                  className={`hn-pra-grid-row ${praSelected === r.id ? 'active' : ''}`}
                  onClick={() => setPraSelected(r.id)}
                >
                  <span>{statusPill(praStatus[r.id])}</span>
                  <span className="hn-mono">{r.supplier}</span>
                  <span className="hn-mono" style={{ color: 'var(--text-muted)' }}>{r.dept}</span>
                  <span className="hn-mono" style={{ fontWeight: 600 }}>{r.code}</span>
                  <span className="hn-prod-name">{r.desc}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>{r.qty}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(r.cost)}</span>
                  <span>{r.deliverTo}</span>
                  <span className="hn-mono" style={{ color: 'var(--text-muted)' }}>{r.source}</span>
                  <span className="hn-mono" style={{ textAlign: 'right' }}>{r.reqNo}</span>
                </div>
              ))}
            </div>

            {/* Stock ledger for the selected product */}
            <div className="hn-oo-card-head" style={{ marginTop: '14px' }}>Stock Ledger · {selected.code}</div>
            <div className="hn-pra-ledger-head">
              <span>Date</span><span style={{ textAlign: 'right' }}>Qty</span><span>Type</span><span>User</span><span style={{ textAlign: 'right' }}>Cost</span><span style={{ textAlign: 'right' }}>Sell</span>
            </div>
            {(d.ledger || []).map((l, i) => (
              <div key={i} className="hn-pra-ledger-row">
                <span className="hn-mono">{l.date}</span>
                <span className="hn-mono" style={{ textAlign: 'right', color: l.qty < 0 ? '#DC2626' : 'inherit' }}>{l.qty.toFixed(2)}</span>
                <span className="hn-mono">{l.type}</span>
                <span className="hn-mono" style={{ color: 'var(--text-muted)' }}>{l.user}</span>
                <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(l.cost)}</span>
                <span className="hn-mono" style={{ textAlign: 'right' }}>${fmtMoney(l.sell)}</span>
              </div>
            ))}
          </div>

          {/* Right detail panel */}
          <aside className="hn-pra-detail">
            <div className="hn-pra-supbar">
              <div>
                <div className="hn-pra-supno hn-mono">#{selected.supplier}</div>
                <div className="hn-pra-supname">{selected.supplierName}</div>
                <div className="hn-pra-supfrom hn-mono">{selected.supplierFrom}</div>
              </div>
              <div className="hn-pra-minorder">
                <span>Min Order</span>
                <span className="hn-mono">${fmtMoney(d.minOrderValue || 0)}</span>
              </div>
            </div>

            <div className="hn-pra-detrow">
              <PmvSpec label="Status" value={d.status} mono={false} />
              <PmvSpec label="Supplier Code" value={d.supplierCode} />
              <PmvSpec label="Range" value={d.range} />
            </div>
            <div className="hn-pra-detrow">
              <PmvSpec label="Group" value={d.group} />
              <PmvSpec label="Avg Lead Time" value={`${d.avgLeadTime} days`} />
              <PmvSpec label="Available Online" value={d.availableOnline} mono={false} />
            </div>
            <PmvSpec label="2nd Description" value={d.desc2} mono={false} span={1} />

            <div className="hn-pra-sec">Replenishment</div>
            <div className="hn-pra-detrow">
              <PmvSpec label="Method" value={d.replenishMethod} mono={false} />
              <PmvSpec label="Supp Reorder Qty" value={(d.suppReorderQty ?? 0).toFixed(2)} />
              <PmvSpec label="Avg Weekly Demand" value={(d.avgWeeklyDemand ?? 0).toFixed(2)} />
            </div>
            <div className="hn-pra-detrow">
              <PmvSpec label="Local PO Available" value={d.localPO} />
              <PmvSpec label="Stock Constrained" value={d.stockConstrained} />
              <PmvSpec label="Store Reorder Qty" value={(d.storeReorderQty ?? 0).toFixed(2)} />
            </div>

            {d.qty && (
              <>
                <div className="hn-pra-sec">Quantities</div>
                <div className="hn-pra-detrow">
                  <PmvSpec label="Physical SOH" value={d.qty.physicalSOH} />
                  <PmvSpec label="Not Avail. for Sale" value={d.qty.notAvail} />
                  <PmvSpec label="Available In Store" value={d.qty.availInStore} color="#B45309" />
                </div>
                <div className="hn-pra-detrow">
                  <PmvSpec label="On Sales Orders" value={d.qty.salesOrders} />
                  <PmvSpec label="On Purchase Order" value={d.qty.onPO} />
                  <PmvSpec label="Total Avail. for Sale" value={d.qty.totalAvail} color="#16A34A" />
                </div>
              </>
            )}

            {d.buy && (
              <>
                <div className="hn-pra-sec">Buy Price</div>
                <div className="hn-pra-detrow">
                  <PmvSpec label="Invoice" value={`$${fmtMoney(d.buy.invoice)}`} />
                  <PmvSpec label="Freight" value={`$${fmtMoney(d.buy.freight)}`} />
                  <PmvSpec label="Internal Rebate" value={`$${fmtMoney(d.buy.internalRebate)}`} />
                </div>
                <div className="hn-pra-detrow">
                  <PmvSpec label="Cost (Excl. Tax)" value={`$${fmtMoney(d.buy.costExTax)}`} color="var(--accent)" />
                  <PmvSpec label="O&A Rebate" value={`$${fmtMoney(d.buy.oaRebate)}`} />
                  <PmvSpec label="O&A Sales" value={`$${fmtMoney(d.buy.oaSales)}`} />
                </div>
              </>
            )}
          </aside>
        </div>
      </main>
    );
  };

  // ─── Rebuild Suggested Purchase Request — options (photo 2) ────────────────
  const renderRebuildPR = () => {
    const save = () => { setRebuildSaved(true); setTimeout(() => setRebuildSaved(false), 2200); };
    return (
      <main className="hn-screen">
        <div className="hn-fade-in" style={{ marginBottom: '18px' }}>
          <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
          <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>Rebuild Suggested Purchase Request</h1>
          <p className="hn-screen-sub" style={{ margin: '6px 0 0' }}>Set the scope, then press Page Down (or Save) to rebuild.</p>
        </div>

        <div className="hn-rb-card hn-fade-in" onKeyDown={(e) => { if (e.key === 'PageDown') { e.preventDefault(); save(); } }}>
          <div className="hn-rb-field">
            <label className="hn-field-label">Franchisee Code</label>
            <div className="hn-rb-fixed hn-mono">13660</div>
          </div>
          <div className="hn-rb-field">
            <label className="hn-field-label" style={{ color: 'var(--accent)' }}>Select Movex Division <em style={{ fontStyle: 'normal', color: 'var(--text-faint)', fontWeight: 400 }}>(Blank for all)</em></label>
            <div className="hn-mpr-supwrap">
              <input className="hn-input hn-mono" style={{ paddingLeft: '12px' }} value={rebuildForm.division} onChange={(e) => setRebuildForm((f) => ({ ...f, division: e.target.value.toUpperCase().slice(0, 6) }))} placeholder="Blank for all" />
              <span className="hn-mpr-f4">F4 = List</span>
            </div>
          </div>
          <div className="hn-rb-field">
            <label className="hn-field-label">Select Department <em style={{ fontStyle: 'normal', color: 'var(--text-faint)', fontWeight: 400 }}>(Blank for all)</em></label>
            <input className="hn-input hn-mono" style={{ paddingLeft: '12px' }} value={rebuildForm.department} onChange={(e) => setRebuildForm((f) => ({ ...f, department: e.target.value.replace(/\D/g, '').slice(0, 3) }))} placeholder="Blank for all" inputMode="numeric" />
          </div>
          <div className="hn-rb-field">
            <label className="hn-field-label">Select Supplier Code <em style={{ fontStyle: 'normal', color: 'var(--text-faint)', fontWeight: 400 }}>(Blank for all)</em></label>
            <input className="hn-input hn-mono" style={{ paddingLeft: '12px' }} value={rebuildForm.supplier} onChange={(e) => setRebuildForm((f) => ({ ...f, supplier: e.target.value.replace(/\D/g, '').slice(0, 6) }))} placeholder="Blank for all" inputMode="numeric" />
          </div>

          <div className="hn-rb-foot">
            <button type="button" className="hn-btn-primary" style={{ width: 'auto', padding: '0 20px' }} onClick={save}>
              Rebuild <span className="hn-mono" style={{ fontSize: '11px', opacity: 0.8, marginLeft: '6px' }}>PgDn</span>
            </button>
            {rebuildSaved && <span className="hn-rb-saved">✓ Suggested purchase request rebuilt</span>}
            <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)' }}><kbd className="hn-kbd-inline">Esc</kbd> Exit · <kbd className="hn-kbd-inline">PgDn</kbd> Save</span>
          </div>
        </div>
      </main>
    );
  };


  const renderInvoice = () => {
    const c = activeCustomer || {};
    const opNum = invoiceOperator || operatorNumber;
    const opName = OPERATOR_NAMES[opNum] || null;
    const inv = reopenedInvoice;
    const takenItems = inv ? inv.takenItems : 0;
    const undeliveredItems = inv ? inv.undeliveredItems : 0;
    const deliveryFee = inv ? inv.deliveryFee : '$0.00';
    const orderTotal = inv ? inv.total : '$0.00';
    return (
      <main className="hn-screen">
        {/* Header row */}
        <div className="hn-fade-in" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div className="hn-eyebrow" style={{ marginBottom: '8px' }}>{breadcrumb}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <h1 className="hn-serif hn-screen-title" style={{ margin: 0 }}>
                {inv ? <>Invoice <span className="hn-mono">{inv.id}</span></> : 'New Invoice'}
              </h1>
              {inv && (
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px',
                  background: inv.status === 'Delivered' ? 'rgba(21,128,61,0.1)' : 'rgba(217,119,6,0.1)',
                  color:      inv.status === 'Delivered' ? 'var(--success)'       : '#B45309',
                }}>
                  {inv.status}
                </span>
              )}
            </div>
            {inv && (
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '5px' }}>
                Reopened invoice · originally raised {inv.date}
              </div>
            )}
          </div>
          {/* Salesperson + type-of-sale badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="hn-pill-group hn-pill-group-btn"
              onClick={() => setSalespersonOpen(true)}
              title="Alt + S — reassign salesperson"
            >
              <span className="hn-pill-seg">
                <User2 size={13} strokeWidth={1.75} />
                {opName
                  ? <span style={{ fontWeight: 500 }}>{opName}</span>
                  : <span style={{ color: 'var(--text-muted)' }}>Operator</span>}
              </span>
              <span className="hn-pill-divider" />
              <span className="hn-pill-seg hn-mono" style={{ fontWeight: 600 }}>OP {opNum}</span>
            </button>
            <button
              type="button"
              className="hn-pill-group hn-pill-group-btn"
              onClick={() => setPaymentTypeOpen(true)}
              title="Alt + T — type of sale"
            >
              <span className="hn-pill-seg">
                <span style={{ fontWeight: 500 }}>
                  {PAYMENT_TYPES.find((p) => p.id === paymentType)?.label || 'Cash'}
                </span>
              </span>
              <span className="hn-pill-divider" />
              <span className="hn-pill-seg hn-mono" style={{ fontSize: '10px', opacity: 0.7 }}>⌥T</span>
            </button>
          </div>
        </div>

        {/* Function-key toolbar */}
        <div className="hn-inv-fnbar hn-fade-in">
          <button type="button" className="hn-inv-fnbtn" onClick={() => setInvFeature('orderDetail')}>
            <span className="hn-inv-fnkey">F3</span> Order Detail
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setInvFeature('productItems')}>
            <span className="hn-inv-fnkey">F11</span> Product Items
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setInvFeature('modifyProduct')}>
            <span className="hn-inv-fnkey">F2</span> Modify Product
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setBrowseOpen(true)}>
            <span className="hn-inv-fnkey">F4</span> Browse Products
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setNotesOpen(true)}>
            <span className="hn-inv-fnkey">⌥F3</span> Invoice Notes
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setInvFeature('tape')}>
            <span className="hn-inv-fnkey">⌥F11</span> Tape
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setPaymentTypeOpen(true)}>
            <span className="hn-inv-fnkey">⌥T</span> Type of Sale
          </button>
          <button type="button" className="hn-inv-fnbtn" onClick={() => setSalespersonOpen(true)}>
            <span className="hn-inv-fnkey">⌥S</span> Salesperson
          </button>
        </div>

        {/* Customer + Notes panels */}
        <div className="hn-invoice-top hn-fade-in">
          <div className="hn-panel hn-panel-customer">
            <div className="hn-panel-title">Customer</div>
            <div className="hn-cust-name">{c.firstName} {c.lastName}</div>
            <div className="hn-cust-grid">
              <div><span className="hn-detail-label">Customer No.</span><span className="hn-detail-value hn-mono">{c.id}</span></div>
              <div><span className="hn-detail-label">Phone</span><span className="hn-detail-value hn-mono">{c.mobile || c.phone || '—'}</span></div>
              <div><span className="hn-detail-label">House address</span><span className="hn-detail-value">{c.address || '—'}</span></div>
              <div><span className="hn-detail-label">Delivery address</span><span className="hn-detail-value">{c.deliveryAddress || c.address || '—'}</span></div>
            </div>
          </div>
          <div className="hn-panel hn-panel-notes">
            <div className="hn-panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Invoice Notes</span>
              <button type="button" className="hn-btn-ghost" style={{ padding: '5px 9px', fontSize: '12px' }} onClick={() => setNotesOpen(true)}>
                Edit <span className="hn-mono" style={{ fontSize: '10px', color: 'var(--text-faint)', marginLeft: '3px' }}>⌥F3</span>
              </button>
            </div>
            <div className="hn-notes-preview">
              {invoiceNotes.trim() ? invoiceNotes : 'No notes yet. Press Alt + F3 to add notes.'}
            </div>
          </div>
        </div>

        {/* Product search bar */}
        <button type="button" className="hn-product-search hn-fade-in" onClick={() => setBrowseOpen(true)}>
          <Search size={16} strokeWidth={1.75} style={{ color: 'var(--text-muted)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Search products to add to this invoice…</span>
          <span className="hn-mono hn-f4-badge">F4</span>
        </button>

        {/* Items */}
        <div className="hn-items hn-fade-in">
          <div className="hn-items-empty">
            <div style={{ fontSize: '14px', fontWeight: 500 }}>
              {inv ? 'Line items aren\u2019t connected yet' : 'No products on this invoice yet'}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '3px' }}>
              {inv
                ? 'This is a mock invoice — totals below reflect the record, but individual line items will appear here once SAP is wired up.'
                : <>Press <kbd className="hn-kbd-inline">F4</kbd> or use the search bar above to find products.</>}
            </div>
          </div>
        </div>

        {/* Totals bar */}
        <div className="hn-totals hn-fade-in">
          <div className="hn-total-item">
            <span className="hn-detail-label">Taken Items</span>
            <span className="hn-total-value hn-mono">{takenItems}</span>
          </div>
          <div className="hn-totals-divider" />
          <div className="hn-total-item">
            <span className="hn-detail-label">Undelivered Items</span>
            <span className="hn-total-value hn-mono">{undeliveredItems}</span>
          </div>
          <div className="hn-totals-divider" />
          <div className="hn-total-item">
            <span className="hn-detail-label">Delivery Fee</span>
            <span className="hn-total-value hn-mono">{deliveryFee}</span>
          </div>
          <div className="hn-totals-divider" />
          <div className="hn-total-item hn-total-grand">
            <span className="hn-detail-label">Order Total</span>
            <span className="hn-total-value hn-mono">{orderTotal}</span>
          </div>
        </div>

        {/* Shortcut hints */}
        <div className="hn-screen-footer">
          <span><kbd className="hn-kbd-inline">F3</kbd> Order detail</span>
          <span><kbd className="hn-kbd-inline">F11</kbd> Product items</span>
          <span><kbd className="hn-kbd-inline">F2</kbd> Modify product</span>
          <span><kbd className="hn-kbd-inline">F4</kbd> Browse products</span>
          <span><kbd className="hn-kbd-inline">⌥F3</kbd> Invoice notes</span>
          <span><kbd className="hn-kbd-inline">⌥F11</kbd> Tape</span>
          <span><kbd className="hn-kbd-inline">⌥T</kbd> Type of sale</span>
          <span><kbd className="hn-kbd-inline">⌥S</kbd> Salesperson</span>
          <span><kbd className="hn-kbd-inline">Esc</kbd> Back</span>
        </div>
      </main>
    );
  };

  return (
    <>
      <style>{HN_STYLES}</style>

      <div className="hn-app" data-theme={theme}>
        {!isLoggedIn ? (
          /* ---------------- LOGIN SCREEN ---------------- */
          <div
            className="hn-bg-login"
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 20px',
            }}
          >
            <div
              className="hn-card hn-fade-in"
              style={{
                width: '100%',
                maxWidth: '440px',
                padding: '40px 36px 32px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{ marginBottom: '32px' }}>
                <div className="hn-amber-bar" style={{ marginBottom: '20px' }} />
                <div className="hn-eyebrow" style={{ marginBottom: '10px' }}>
                  Sales Terminal · v0.1
                </div>
                <div className="hn-wordmark" style={{ fontSize: '28px', marginBottom: '8px' }}>
                  Harvey Norman
                </div>
                <div
                  className="hn-serif"
                  style={{
                    fontStyle: 'italic',
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    fontWeight: 400,
                  }}
                >
                  Hoppers Crossing <span className="hn-divider-dot" /> Vic 3029
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      marginBottom: '7px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Operator Number
                  </label>
                  <div className="hn-input-wrap">
                    <User2 size={16} className="hn-input-icon" strokeWidth={1.75} />
                    <input
                      ref={operatorRef}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      className="hn-input hn-mono"
                      placeholder="4 digits"
                      value={operatorNumber}
                      maxLength={4}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
                        setOperatorNumber(digits);
                        if (digits.length === 4 && passwordRef.current) {
                          passwordRef.current.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (passwordRef.current) passwordRef.current.focus();
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      marginBottom: '7px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    Password
                  </label>
                  <div className="hn-input-wrap">
                    <KeyRound size={16} className="hn-input-icon" strokeWidth={1.75} />
                    <input
                      ref={passwordRef}
                      type={showPwd ? 'text' : 'password'}
                      autoComplete="off"
                      className="hn-input hn-mono"
                      style={{ paddingRight: '42px' }}
                      placeholder="8–16 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLogin(e);
                      }}
                      maxLength={16}
                    />
                    <button
                      type="button"
                      className="hn-eye"
                      onClick={() => setShowPwd((s) => !s)}
                      tabIndex={-1}
                      aria-label={showPwd ? 'Hide password' : 'Show password'}
                    >
                      {showPwd ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <span className={`hn-check ${pwdLen ? 'met' : ''}`}>
                      <span className="hn-check-dot" /> 8–16 characters
                    </span>
                    <span className={`hn-check ${pwdLetter ? 'met' : ''}`}>
                      <span className="hn-check-dot" /> 4 letters
                    </span>
                    <span className={`hn-check ${pwdDigit ? 'met' : ''}`}>
                      <span className="hn-check-dot" /> 4 digits
                    </span>
                  </div>
                </div>

                {error && <div className="hn-error">{error}</div>}

                <button
                  type="button"
                  className="hn-btn-primary"
                  onClick={handleLogin}
                  disabled={!formValid}
                  style={{ marginTop: '6px' }}
                >
                  Log In
                  <ArrowUpRight size={16} strokeWidth={2} />
                </button>
              </div>

              <div
                style={{
                  marginTop: '28px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: 'var(--text-faint)',
                  fontFamily: 'Consolas, monospace',
                  letterSpacing: '0.04em',
                }}
              >
                <span><LiveClock type="date" uppercase /></span>
                <span><LiveClock /></span>
              </div>
            </div>
          </div>
        ) : (
          /* ---------------- LOGGED-IN APP ---------------- */
          <div className="hn-app-shell">
            {renderTopBar()}
            <div className="hn-body">
              {currentScreen !== 'invoice' && renderSidebar()}
              <div className="hn-content-pane">
                {MENU_SCREENS.includes(currentScreen) &&
                  renderMenuContent(
                    SCREEN_LABELS[currentScreen] || 'Menu',
                    currentScreen === 'home' ? (
                      <>
                        Press a <span className="hn-mono hn-strong">number key (0–9)</span> or click an item on the left. Press{' '}
                        <span className="hn-mono hn-strong">Alt + B</span> at any time to browse products.
                      </>
                    ) : (
                      <>
                        Press a <span className="hn-mono hn-strong">number key (0–9)</span> or click an item on the left, or{' '}
                        <kbd className="hn-kbd-inline">Esc</kbd> to go back.
                      </>
                    )
                  )}

                {currentScreen === 'onlineOrders' && renderOnlineOrders()}
                {currentScreen === 'undeliveredSales' && renderUndeliveredSales()}
                {currentScreen === 'customerServiceTickets' && renderCustomerServiceTickets()}
                {currentScreen === 'quotations' && renderQuotations()}
                {currentScreen === 'reservations' && renderReservations()}
                {currentScreen === 'salesKpis' && renderSalesKpis()}
                {currentScreen === 'manualPR' && renderManualPR()}
                {currentScreen === 'prApprovals' && renderPrApprovals()}
                {currentScreen === 'rebuildPR' && renderRebuildPR()}
                {currentScreen === 'cashSale' && renderCashSale()}
                {currentScreen === 'barcodePrint' && renderBarcodePrint()}
                {currentScreen === 'insuranceInvoices' && renderInsuranceInvoices()}
                {currentScreen === 'ediOrders' && renderEdiOrders()}
                {currentScreen === 'productCareOrders' && renderProductCareOrders()}
                {currentScreen === 'invoiceModifyDetail' && renderInvoiceModifyDetail()}
                {currentScreen === 'retrieveSuspended' && renderRetrieveSuspended()}
                {currentScreen === 'pendingCancel' && renderPendingCancel()}
                {currentScreen === 'furtherPayments' && renderFurtherPayments()}
                {currentScreen === 'tillBalancing' && renderTillBalancing()}
                {currentScreen === 'cnpTransactions' && renderCnpTransactions()}
                {currentScreen === 'invoiceSearch' && renderInvoiceSearch()}
                {currentScreen === 'createCustomer' && renderCreateCustomer()}
                {currentScreen === 'invoice' && renderInvoice()}
              </div>
            </div>
          </div>
        )}

        {/* Logout confirmation — shown when Esc pressed on home screen */}
        {logoutPrompt && (
          <div className="hn-browse-overlay hn-modal-scrim" style={{ zIndex: 900 }}>
            <div className="hn-logout-prompt hn-fade-in">
              <div style={{ marginBottom: '20px' }}>
                <div className="hn-eyebrow" style={{ marginBottom: '6px', color: 'var(--text-muted)' }}>Session</div>
                <div className="hn-serif" style={{ fontSize: '24px', fontWeight: 500, lineHeight: 1.1 }}>
                  Log out?
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '13.5px', color: 'var(--text-muted)' }}>
                  Operator <span className="hn-mono" style={{ fontWeight: 600 }}>{operatorNumber}</span>
                  {OPERATOR_NAMES[operatorNumber] && (
                    <> · {OPERATOR_NAMES[operatorNumber]}</>
                  )}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  className="hn-btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleLogout}
                >
                  Yes, log out
                  <ArrowUpRight size={15} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  className="hn-btn-ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setLogoutPrompt(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="hn-browse-footer" style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                <span><kbd className="hn-kbd-inline">↵</kbd> Log out</span>
                <span><kbd className="hn-kbd-inline">Esc</kbd> Stay</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating, movable popups */}
        <BrowseDialog isOpen={browseOpen} onClose={() => setBrowseOpen(false)} />
        <ProductGroupsDialog isOpen={productGroupsOpen} onClose={() => setProductGroupsOpen(false)} />
        <NewTicketDialog
          isOpen={cstNewTicketOpen}
          onClose={() => setCstNewTicketOpen(false)}
          onCreate={() => setCstNewTicketOpen(false)}
        />
        <OpenTicketDialog
          ticket={cstOpenTicket ? MOCK_CS_TICKETS.find((t) => t.ticketNo === cstOpenTicket) : null}
          onClose={() => setCstOpenTicket(null)}
        />
        {invFeature && (
          <InvoiceFeatureDialog feature={invFeature} onClose={() => setInvFeature(null)} />
        )}
        {/* Pending Invoice Cancelation → Cancellation Reason Code (photo 2) */}
        {pcReasonOpen && (
          <MovablePanel title="Cancellation Reason Code" onClose={() => setPcReasonOpen(false)} width={440}>
            <div className="hn-browse-body" style={{ padding: '16px' }}>
              <label className="hn-field-label">Enter Reason Code for this Cancellation</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  className="hn-input hn-mono"
                  style={{ maxWidth: '110px' }}
                  autoFocus
                  value={pcReason}
                  placeholder="e.g. 02"
                  onChange={(e) => setPcReason(e.target.value.replace(/\D/g, '').slice(0, 2))}
                  onKeyDown={(e) => {
                    if (e.key === 'F4') { e.preventDefault(); setPcListOpen((v) => !v); return; }
                    if (e.key === 'Enter') { e.preventDefault(); confirmCancellation(); }
                  }}
                />
                <button type="button" className="hn-us-action-btn" onClick={() => setPcListOpen((v) => !v)}>
                  <kbd className="hn-kbd-inline">F4</kbd> List
                </button>
              </div>
              {pcListOpen && (
                <div style={{ marginTop: '10px', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                  {CANCEL_REASON_CODES.map((r) => (
                    <button
                      key={r.code}
                      type="button"
                      onClick={() => { setPcReason(r.code); setPcListOpen(false); }}
                      style={{
                        display: 'flex', gap: '10px', alignItems: 'center', width: '100%', textAlign: 'left',
                        padding: '7px 12px', border: 'none', borderBottom: '1px solid var(--border)',
                        background: pcReason === r.code ? 'var(--accent-soft)' : 'transparent',
                        cursor: 'pointer', fontSize: '12.5px', color: 'var(--text)',
                      }}
                    >
                      <span className="hn-mono" style={{ fontWeight: 700 }}>{r.code}</span> {r.label}
                    </button>
                  ))}
                </div>
              )}
              {pcReason && !CANCEL_REASON_CODES.some((r) => r.code === pcReason) && pcReason.length >= 2 && (
                <div className="hn-error" style={{ marginTop: '8px' }}>Unknown reason code — press F4 for the list.</div>
              )}
              <button
                type="button"
                className="hn-btn-primary"
                disabled={!CANCEL_REASON_CODES.some((r) => r.code === pcReason)}
                onClick={confirmCancellation}
                style={{ marginTop: '14px', width: 'auto', padding: '10px 18px', background: '#B91C1C' }}
              >
                <X size={15} strokeWidth={2} /> Confirm Cancellation
              </button>
              <div className="hn-browse-footer" style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                <span><kbd className="hn-kbd-inline">F4</kbd> List · <kbd className="hn-kbd-inline">↵</kbd> Confirm</span>
                <span><kbd className="hn-kbd-inline">Esc</kbd> Cancel</span>
              </div>
            </div>
          </MovablePanel>
        )}
        <CustomerSearchDialog isOpen={customerSearchOpen} onClose={() => setCustomerSearchOpen(false)} />
        <InvoiceLookupDialog
          isOpen={invoiceLookupOpen}
          onClose={() => setInvoiceLookupOpen(false)}
          onReopen={reopenInvoice}
          onModify={modifyInvoiceFromLookup}
          savedInvoices={savedInvoices}
          onToggleSave={toggleSavedInvoice}
        />
        {confirmTarget && (
          <ConfirmCustomerDialog
            customer={confirmTarget}
            onConfirm={confirmCustomerAndOpenInvoice}
            onCancel={cancelConfirm}
          />
        )}
        {multiResults && (
          <MultiResultsDialog
            results={multiResults}
            onSelect={selectFromMulti}
            onCancel={() => setMultiResults(null)}
          />
        )}
        {notesOpen && (
          <NotesDialog
            notes={invoiceNotes}
            onChange={setInvoiceNotes}
            onClose={() => setNotesOpen(false)}
          />
        )}
        {paymentTypeOpen && (
          <PaymentTypeDialog
            current={paymentType}
            onSelect={(id) => { setPaymentType(id); setPaymentTypeOpen(false); }}
            onClose={() => setPaymentTypeOpen(false)}
          />
        )}
        {salespersonOpen && (
          <SalespersonDialog
            currentOperator={invoiceOperator || operatorNumber}
            onAssign={(opNum) => { setInvoiceOperator(opNum); setSalespersonOpen(false); }}
            onClose={() => setSalespersonOpen(false)}
          />
        )}
        {calcOpen && <CalculatorPanel onClose={() => setCalcOpen(false)} />}
        {padOpen && (
          <NotepadPanel
            text={padText}
            onChange={setPadText}
            onClose={() => setPadOpen(false)}
          />
        )}

        {/* Security screensaver — sits above everything while locked */}
        {isLoggedIn && locked && (
          <LockScreen currentOperator={operatorNumber} onUnlock={handleUnlock} />
        )}
      </div>
    </>
  );
}
