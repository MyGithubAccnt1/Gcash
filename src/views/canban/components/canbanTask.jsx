import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHourglass,
  faHourglassStart,
  faHourglassEnd,
  faTrashCan,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import Draggable from "react-draggable";
import { useRef, useState } from "react";

export default function CanbanTask({
  title,
  content,
  positionHandler,
  bound,
  id,
  type,
  handleDeletion,
  assign,
  parentRef,
}) {
  const ref = useRef(null);

  const widthRef = useRef(null);
  const topRef = useRef(null);
  const leftRef = useRef(null);
  const heightRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  const [position] = useState({
    x: 0,
    y: 0,
  });

  let icon = faUserClock;

  switch (type) {
    case "todo":
      icon = faHourglass;
      break;
    case "progress":
      icon = faHourglassStart;
      break;
    case "done":
      icon = faHourglassEnd;
      break;
  }

  return (
    <>
      <Draggable
        allowAnyClick={false}
        position={position}
        nodeRef={ref}
        bounds={bound}
        onDrag={() => setIsDragging(true)}
        onMouseDown={(e) => {
          widthRef.current = ref.current.getBoundingClientRect().width;
          heightRef.current = ref.current.getBoundingClientRect().height;

          topRef.current = Math.abs(
            ref.current.getBoundingClientRect().top -
              parentRef.current.getBoundingClientRect().top
          );

          leftRef.current =
            ref.current.getBoundingClientRect().left + window.scrollX;
        }}
        onStop={(e) => {
          const wasDrag = isDragging;

          setIsDragging(false);

          let x = 0;
          let y = 0;

          if (e?.type == "touchend") {
            x = e.changedTouches?.[0]?.clientX;
            y = e.changedTouches?.[0]?.clientY;
          } else {
            x = e.clientX;
            y = e.clientY;
          }

          if (wasDrag) {
            positionHandler({
              x: x,
              y: y,
              id: id,
            });
          }
        }}
      >
        <div
          ref={ref}
          className={`z-50 !cursor-grab border rounded !p-2 flex flex-col`}
          style={
            isDragging
              ? {
                  width: `${Math.ceil(widthRef.current)}px`,
                  height: `${Math.ceil(heightRef.current)}px`,
                  position: "absolute",
                  top: `${Math.ceil(topRef.current)}px`,
                  left: `${Math.ceil(leftRef.current)}px`,
                }
              : undefined
          }
        >
          <div className="relative flex justify-between">
            <span className="text-md font-bold text-wrap truncate">
              {title}
            </span>

            <button
              onTouchStart={() => handleDeletion(id)}
              onClick={() => handleDeletion(id)}
              className="text-gray-700 hover:text-red-500 cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>

          <p className="!pb-1  text-wrap text-clip break-all !mb-auto">
            {content}
          </p>

          <div className="border-t-1 !pt-2 border-gray-400 grid grid-cols-2">
            <div className="flex items-center gap-1 border-e-1">
              <FontAwesomeIcon icon={faUser} />
              <p className="text-sm">{assign ? assign : "None"}</p>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <FontAwesomeIcon icon={icon} />
              <p className="text-sm"></p>
            </div>
          </div>
        </div>
      </Draggable>
      {isDragging && (
        <div
          className="border"
          style={
            isDragging
              ? {
                  width: `${Math.ceil(widthRef.current)}px`,
                  height: `${Math.ceil(heightRef.current)}px`,
                }
              : undefined
          }
        ></div>
      )}
    </>
  );
}
