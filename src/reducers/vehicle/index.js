import {
  GET_VEHICLE_LIST,
  GET_DETAIL_VEHICLE,
  ADD_VEHICLE,
  EDIT_VEHICLE,
  DELETE_VEHICLE,
} from "../../actions/vehicle/VehicleAction";

const initialState = {
  getVehicleLoading: false,
  getVehicleResult: false,
  getVehicleError: false,

  getDetailVehicleLoading: false,
  getDetailVehicleResult: false,
  getDetailVehicleError: false,

  addVehicleLoading: false,
  addVehicleResult: false,
  addVehicleError: false,

  editVehicleLoading: false,
  editVehicleResult: false,
  editVehicleError: false,

  deleteVehicleLoading: false,
  deleteVehicleResult: false,
  deleteVehicleError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VEHICLE_LIST:
      return {
        ...state,
        getVehicleLoading: action.payload.loading,
        getVehicleResult: action.payload.data,
        getVehicleError: action.payload.errorMessage,
      };
    case GET_DETAIL_VEHICLE:
      return {
        ...state,
        getDetailVehicleLoading: action.payload.loading,
        getDetailVehicleResult: action.payload.data,
        getDetailVehicleError: action.payload.errorMessage,
      };
    case ADD_VEHICLE:
      return {
        ...state,
        addVehicleLoading: action.payload.loading,
        addVehicleResult: action.payload.data,
        addVehicleError: action.payload.errorMessage,
      };
    case EDIT_VEHICLE:
      return {
        ...state,
        editVehicleLoading: action.payload.loading,
        editVehicleResult: action.payload.data,
        editVehicleError: action.payload.errorMessage,
      };
    case DELETE_VEHICLE:
      return {
        ...state,
        deleteVehicleLoading: action.payload.loading,
        deleteVehicleResult: action.payload.data,
        deleteVehicleError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
