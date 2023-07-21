import { combineReducers } from "redux";
import UserReducer from "./user";
import AuthReducer from "./auth";
import SupplierReducer from "./supplier";
import BrandReducer from "./brand";
import CostReducer from "./cost";
import PersonalCostReducer from "./personalCost";
import PersonalDebtReducer from "./personalDebt";
import PersonalDebtPaymentReducer from "./personalDebtPayment";
import PersonalSavingReducer from "./personalSaving";
import PersonalSavingTakingReducer from "./personalSavingTaking";
import CompanyCostReducer from "./companyCost";
import PaymentReducer from "./payment";
import VehicleReducer from "./vehicle";
import TypeReducer from "./type";
import PriceReducer from "./price";
import OwnershipReducer from "./ownership";
import CustomerReducer from "./customer";
import ReportReducer from "./report";
import TransactionReducer from "./transaction";
import OrderReducer from "./order";

export default combineReducers({
  UserReducer,
  AuthReducer,
  SupplierReducer,
  BrandReducer,
  VehicleReducer,
  TypeReducer,
  OwnershipReducer,
  PriceReducer,
  CustomerReducer,
  TransactionReducer,
  PaymentReducer,
  CostReducer,
  PersonalCostReducer,
  ReportReducer,
  OrderReducer,
  CompanyCostReducer,
  PersonalDebtReducer,
  PersonalDebtPaymentReducer,
  PersonalSavingReducer,
  PersonalSavingTakingReducer,
});
