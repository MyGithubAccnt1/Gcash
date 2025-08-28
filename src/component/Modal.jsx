import Button from "./Button";

export default function Modal({ onSubmit, onClick, field }) {
  return (
    <>
      <form
        onSubmit={onSubmit}
        onClick={onClick}
        className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[6px] rounded flex justify-center z-50 text-black"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-[rgba(255,255,255,0.5)] backdrop-blur-[6px] p-5 rounded shadow-lg my-auto flex flex-col gap-4 overflow-y-auto"
        >
          <div className="bg-[rgba(0,0,0,0.1)] p-5 rounded-lg relative space-y-3">
            {field?.map((field, index) =>
              field.type === "select" ? (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="uppercase font-bold text-sm select-none"
                  >
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    className="outline-none w-full capitalize"
                    defaultValue={field.placeholder}
                    required={field.required}
                  >
                    {field.options.map((option, index) => {
                      return (
                        <option
                          key={index}
                          className="bg-[rgba(0,0,0,0.1)]"
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : field.type === "file" ? (
                <div key={index} className="flex flex-col gap-3">
                  <div className="md:mx-auto w-full flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg transition-all duration-300 cursor-pointer">
                    <label htmlFor="image" className="text-sm select-none">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      className="hidden"
                    />
                  </div>
                  <div className="md:hidden flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg transition-all duration-300 cursor-pointer">
                    <label htmlFor="image" className="text-sm select-none">
                      Capture Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      capture="environment"
                      className="hidden"
                    />
                  </div>
                </div>
              ) : (
                <div key={index}>
                  <label
                    htmlFor={field.name}
                    className="uppercase font-bold text-sm select-none"
                  >
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    pattern={field.type}
                    inputMode={field.inputMode}
                    step={field.min}
                    min={field.min}
                    placeholder={field.placeholder}
                    className="outline-none w-full bg-transparent"
                  />
                </div>
              )
            )}
          </div>

          <div className="flex justify-between gap-5">
            <Button
              className={`bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 text-black 
                        hover:rounded-[50px]`}
              onClick={onClick}
            >
              Cancel
            </Button>
            <Button
              type={"submit"}
              className={`bg-gradient-to-b from-red-300 via-red-400 to-red-500 text-white
                        hover:rounded-[50px]`}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
