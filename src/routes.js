import Dashboard from "views/Dashboard.js";
import { AddSupplier, EditSupplier, SupplierList } from "views/supplier";
import { EditUser, AddUser, UserList } from "views/user";
import { BrandList, AddBrand, EditBrand } from "views/brand";
import { VehicleList, AddVehicle, EditVehicle } from "views/vehicle";
import { OwnershipList, AddOwnership, EditOwnership } from "views/ownership";
import { PriceList, AddPrice, EditPrice } from "views/price";
import { CustomerList, AddCustomer, EditCustomer } from "views/customer";
import { TransactionList, EditTransaction } from "views/transaction";
import { DetailTransaction, ActiveTransactionList } from "views/transaction";
import ReportList from "views/report/ReportList";
import CostList from "views/cost/CostList";
import PersonalCostList from "views/personalCost/PersonalCostList";
import CompanyCostList from "views/companyCost/CompanyCostList";
import { CostMenuList, MasterDataMenuList } from "views/menuList";
import OrderList from "views/order/OrderList";
import PersonalDebtList from "views/personalDebt/PersonalDebtList";
import PersonalSavingList from "views/personalSaving/PersonalSavingList";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/users",
    name: "Master User",
    component: UserList,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user/add",
    name: "Tambah User",
    component: AddUser,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user/edit/:id",
    name: "Edit User",
    component: EditUser,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/suppliers",
    name: "Master Supplier",
    component: SupplierList,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/supplier/add",
    name: "Tambah Supplier",
    component: AddSupplier,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/supplier/edit/:id",
    name: "Edit Supplier",
    component: EditSupplier,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/brands",
    name: "Master Brand",
    component: BrandList,
    layout: "/admin",
    sidebar: false,
    role: "superadmin",
  },
  {
    path: "/brand/add",
    name: "Tambah Brand",
    component: AddBrand,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/brand/edit/:id",
    name: "Edit Brand",
    component: EditBrand,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/vehicles",
    name: "Master Vehicle",
    component: VehicleList,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/vehicle/add",
    name: "Tambah Vehicle",
    component: AddVehicle,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/vehicle/edit/:id",
    name: "Edit Vehicle",
    component: EditVehicle,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/ownerships",
    name: "Master Ownership",
    icon: "nc-icon nc-single-02",
    component: OwnershipList,
    layout: "/admin",
    sidebar: false,
    role: "superadmin",
  },
  {
    path: "/ownership/add",
    name: "Tambah Ownership",
    component: AddOwnership,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/ownership/edit/:id",
    name: "Edit Ownership",
    component: EditOwnership,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/prices",
    name: "Master Price",
    component: PriceList,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/price/add",
    name: "Tambah Price",
    component: AddPrice,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/price/edit/:id",
    name: "Edit Price",
    component: EditPrice,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/active-transactions",
    name: "Active Transaction",
    icon: "nc-icon nc-align-left-2",
    component: ActiveTransactionList,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/transactions",
    name: "History Transactions",
    icon: "nc-icon nc-align-center",
    component: TransactionList,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/transaction/edit/:id",
    name: "Edit Transaction",
    component: EditTransaction,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/detail-transaction/:id",
    name: "Detail Transaction",
    component: DetailTransaction,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/cost",
    name: "Cost List",
    component: CostList,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/personal-cost",
    name: "Personal Cost List",
    component: PersonalCostList,
    layout: "/admin",
    sidebar: false,
  },

  {
    path: "/company-cost",
    name: "Company Cost List",
    component: CompanyCostList,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/cost-menu",
    name: "Cost Menu",
    icon: "nc-icon nc-tag-content",
    component: CostMenuList,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/personal-debt",
    name: "Personal Debt",
    component: PersonalDebtList,
    icon: "nc-icon nc-credit-card",
    layout: "/admin",
    sidebar: true,
    role: "superadmin",
  },
  {
    path: "/personal-saving",
    name: "Personal Saving",
    component: PersonalSavingList,
    icon: "nc-icon nc-money-coins",
    layout: "/admin",
    sidebar: true,
    role: "superadmin",
  },
  {
    path: "/report",
    name: "Report",
    icon: "nc-icon nc-single-copy-04",
    component: ReportList,
    layout: "/admin",
    sidebar: true,
    role: "superadmin",
  },
  {
    path: "/master-data",
    name: "Master Data Menu",
    icon: "nc-icon nc-settings-gear-65",
    component: MasterDataMenuList,
    layout: "/admin",
    sidebar: true,
    role: "superadmin",
  },

  {
    path: "/customers",
    name: "Master Customer",
    icon: "nc-icon nc-single-02",
    component: CustomerList,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/customer/add",
    name: "Tambah Customer",
    component: AddCustomer,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/customer/edit/:id",
    name: "Edit Customer",
    component: EditCustomer,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "nc-icon nc-bullet-list-67",
    component: OrderList,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
