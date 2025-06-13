import { BASE_URL } from "@/service/path";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SurveyComponent from "./SurveyComponent";
import Modal from "./modalIfluencer";
const Index = ({ item, index }) => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);


  return (
    <div className="flex flex-row min-h-[400px] w-full p-3 justify-around space-x-3">
      <div className="h-full justify-center flex">
        <img
          alt=""
          src={BASE_URL + "/file/" + item?.photo2?.file_name}
          className="size-32 rounded-full object-cover justify-center flex align-middle text-center content-center mt-12"
        />
      </div>
      <div className="flex flex-col space-y-3 text-center align-middle justify-center">
        <div className="flex flex-row text-2xl">
          <div>{index + 1 + "."}</div>
          <div>&nbsp;</div>
          <div>{item?.name}</div>
        </div>
        <div className="flex flex-row space-x-2 text-gray-400">
          <div>
            <a
              className="text-muted inline-flex items-center rounded-lg  text-sm focus:outline-none  dark:text-gray-400"
              aria-label="Instagram"
              href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5">
                <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z"></path>
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M16.5 7.5l0 .01"></path>
              </svg>
            </a>
          </div>
          <div>{item?.influencer_ig_name}</div>
        </div>
        <div className="flex flex-row space-x-2 text-gray-400">
          <div>
            <a
              className="text-muted inline-flex items-center rounded-lg  text-sm focus:outline-none  dark:text-gray-400"
              aria-label="Instagram"
              href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                />
              </svg>
            </a>
          </div>
          <div>{item?.email}</div>
        </div>
        <div className="flex flex-row space-x-2 text-gray-400">
          <div>
            <a
              className="text-muted inline-flex items-center rounded-lg  text-sm focus:outline-none  dark:text-gray-400"
              aria-label="Instagram"
              href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </a>
          </div>
          <div>{item?.location}</div>
        </div>
        <button
          onClick={() => (setOpenModal(true), setData(item))}
          className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring w-full max-w-[250px] active:text-indigo-500 text-center "
          href="#">
          Дэлгэрэнгүй харах
        </button>
      </div>

      <div className="flex flex-col space-y-3 justify-center">
        <a
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Price</dt>

                <dd className="text-sm text-gray-500">Followers</dd>
              </div>

              <div>
                <dt className="sr-only">Address</dt>

                <dd className="font-medium">{item?.followers + "k"}</dd>
              </div>
            </dl>
          </div>
        </a>

        <a
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Price</dt>

                <dd className="text-sm text-gray-500 flex flex-row space-x-2">
                  Engagement rate
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                    />
                  </svg>
                </dd>
              </div>

              <div>
                <dt className="sr-only">Address</dt>

                <dd className="font-medium flex flex-row space-x-2">
                  <div>{item?.engagement_rate + "%"}</div>
                </dd>
              </div>
            </dl>
          </div>
        </a>

        <a
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Price</dt>

                <dd className="text-sm text-gray-500 flex flex-row space-x-2">
                  Average likes
                </dd>
              </div>

              <div>
                <dt className="sr-only">Address</dt>

                <dd className="font-medium flex flex-row space-x-2">
                  <div>{item?.avg_likes + "k"}</div>
                </dd>
              </div>
            </dl>
          </div>
        </a>
      </div>

      <div className="flex flex-col justify-center">
        <a
          href="#"
          className="block rounded-lg p-4 shadow-sm shadow-indigo-100 h-full">
          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Price</dt>

                <dd className="text-sm text-gray-500 flex flex-row space-x-2">
                  Audience location by country
                </dd>
              </div>
            </dl>
          </div>

          <dl>
            <div>
              <dt className="sr-only">Price</dt>

              <dd className="text-sm text-black flex flex-row space-x-2 mt-3">
                Mongolia
              </dd>
              <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className="h-1 bg-primary" style={{ width: "45%" }} />
              </div>
            </div>
          </dl>
        </a>
      </div>

      <Modal 
      open={openModal} 
      onClose={() => setOpenModal(false)} />
    
    </div>
  );
};

export default Index;
