import { useRef } from "react";

export default function AddTaskForm() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  const getValues = () => {
    return {
      title: titleRef.current?.value,
      content: contentRef.current?.value,
    };
  };

  const getForm = () => (
    <>
      <form>
        <div className="flex flex-col items-start !mb-2 gap-1">
          <label className="text-md font-semibold">Title</label>
          <input
            ref={titleRef}
            name="title"
            required
            className="border rounded !p-1 w-full"
          />
        </div>
        <div className="flex flex-col items-start !mb-2 gap-1">
          <label className="text-md font-semibold">Content</label>
          <textarea
            ref={contentRef}
            name="content"
            required
            rows={5}
            className="border rounded !p-1 w-full"
          ></textarea>
        </div>
      </form>
    </>
  );

  return {
    form: getForm,
    values: getValues,
  };
}
