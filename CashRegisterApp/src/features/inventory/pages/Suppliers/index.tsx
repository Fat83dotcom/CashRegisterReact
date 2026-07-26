import { SupplierSearch } from "./Search";
import { InventoryService } from "../../api/inventoryService";
import { createSearchLoader } from "../../../../utils/routeLoaders";

export const suppliersLoader = createSearchLoader(InventoryService.searchSuppliers);

export function SuppliersPage() {
  return <SupplierSearch />;
}
