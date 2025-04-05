import { useProductStore } from "../store/useProductStore";
import { DollarSign, ImagesIcon, Package2Icon, PlusCircleIcon } from "lucide-react";

export default function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog id="add_product_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box overflow-y-hidden">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-10">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-10">
          <div className="grid gap-6">
            {/* product name input */}
            <div className="form-control flex flex-col space-y-1">
              <label className="label">
                <span className="label-text text-base font-medium mb-3">
                  Product Name
                </span>
              </label>
              <label className="input input-bordered focus-within:input-primary flex items-center w-full">
                <Package2Icon className="size-5" />
                <input
                  type="search"
                  placeholder="Enter product name"
                  className="py-3 bg-transparent focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </label>
            </div>

            {/* product price input */}
            <div className="form-control flex flex-col space-y-1">
              <label className="label">
                <span className="label-text text-base font-medium mb-3">
                  Price
                </span>
              </label>
              <label className="input input-bordered focus-within:input-primary flex items-center w-full">
                <DollarSign className="size-5" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="py-3 bg-transparent focus:outline-none"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </label>
            </div>

            {/* product image */}
            <div className="form-control flex flex-col space-y-1">
              <label className="label">
                <span className="label-text text-base font-medium mb-3">
                  Image URL
                </span>
              </label>
              <label className="input input-bordered focus-within:input-primary flex items-center w-full">
                <ImagesIcon className="size-5" />
                <input
                  type="search"
                  placeholder="http://example.com/image.jpg"
                  className="py-3 bg-transparent focus:outline-none"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </label>
            </div>
          </div>

          {/* submit buttons */}
          <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost">Cancel</button>
              </form>
              <button className="btn btn-primary min-w-[120px]" disabled={!formData.name || !formData.price || !formData.image || loading} >

                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Add Product
                  </>
                )
                }
              </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
