import logo from "@/assets/logo.jpg";

export default function PageLoader() {
  return (
    <>
      <style>
        {`
          @keyframes loaderSpin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Rotating Ring */}
          <div
            className="absolute inset-0 rounded-full border-[3px] border-gray-200"
            style={{
              borderTopColor: "rgb(126,0,62)",
              animation: "loaderSpin 1.2s linear infinite",
            }}
          />

          {/* Logo */}
          <div className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
            <img
              src={logo}
              alt="Saatvik"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}