import { useNavigate } from "react-router-dom";

type ModalRequireLoginProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
};

const ModalRequireLogin = ({
  isOpen,
  setIsOpen,
  navigate,
}: ModalRequireLoginProps) => {
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white border  border-white rounded-lg p-6 text-white max-w-lg w-full  backdrop-blur-xl ">
            <div className="flex flex-row-reverse">
              <i
                onClick={() => setIsOpen(false)}
                className="fa-solid fa-xmark text-black fa-lg cursor-pointer "
              ></i>
            </div>
            <h2 className="text-3xl text-red-500 font-bold  text-center">
              Thành viên
            </h2>

            <img
              className="mx-auto"
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:80/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png"
              alt=""
            />
            <p className="mt-2 text-lg text-black font-bold drop-shadow-lg text-center">
              Vui lòng đăng nhập tài khoản
            </p>
            <div className="flex justify-center">
              <button
                className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 transition text-white rounded-lg shadow-lg"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalRequireLogin;
