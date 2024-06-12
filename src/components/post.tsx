import { useContext, useState } from "react";
import { UserContext } from "@/context/context";

interface PostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  numLikes: number;
  numDislikes: number;
  selectId: (val: string) => void;
  toggle: (val: boolean) => void;
}

export default function Post({
  id,
  title,
  content,
  author,
  date,
  numLikes,
  numDislikes,
  selectId,
  toggle,
}: PostProps) {
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);

  const like = likes ? "fill-red-500" : "fill-gray-500";
  const dislike = dislikes ? "fill-blue-500" : "fill-gray-500";

  const user = useContext(UserContext);

  const hasPermission = user && user.id === author;

  return (
    <>
      <div className="border rounded-lg p-4 flex flex-col gap-8 w-2/5">
        <div className="flex flex-col gap-1">
          <div className="text-2xl flex flex-row justify-between">
            <div>{title}</div>
            {hasPermission && (
              <div className="flex flex-row gap-4">
                <button>
                  <svg
                    onClick={() => {
                      toggle(true);
                      selectId(id);
                    }}
                    className="h-6 w-6 cursor-pointer fill-white"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
                      fill-rule="nonzero"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    onClick={() => {
                      //toggle(true);
                      selectId(id);
                    }}
                    className="h-6 w-6 cursor-pointer fill-white"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
                      fill-rule="nonzero"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <div className="text-sm italic">{author}</div>
          <div className="text-sm">{date.slice(0, 10)}</div>
        </div>
        <div className="text-sm">{content}</div>
        <div className="flex gap-8">
          <div className="text-sm flex flex-row gap-2">
            <button
              onClick={() => {
                setLikes(!likes);
                setDislikes(false);
              }}>
              <svg
                className={like}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24">
                <path d="M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z" />
              </svg>
            </button>
            <div>{numLikes}</div>
          </div>
          <div className="text-sm flex flex-row gap-2">
            <button
              onClick={() => {
                setDislikes(!dislikes);
                setLikes(false);
              }}>
              <svg
                className={dislike}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24">
                <path d="M5 14h-5v-12h5v12zm18.875-4.809c0-.646-.555-1.32-1.688-1.41-.695-.055-.868-.623-.031-.812.701-.159 1.098-.652 1.098-1.181 0-.629-.559-1.309-1.826-1.543-.766-.141-.842-.891-.031-.953.688-.053.96-.291.96-.626-.001-.931-1.654-2.666-4.852-2.666-4.16 0-6.123 2.067-10.505 2.768v10.878c2.375.869 4.466 2.644 5.688 6.886.478 1.661.781 3.468 2.374 3.468 2.375 0 2.594-5.125 1.688-8.781 1.312-.688 3.751-.936 4.979-.885 1.771.072 2.271-.818 2.271-1.49 0-1.011-.833-1.35-1.354-1.51-.609-.188-.889-.807-.031-.922.836-.112 1.26-.656 1.26-1.221z" />
              </svg>
            </button>
            <div>{numDislikes}</div>
          </div>
        </div>
      </div>
    </>
  );
}
