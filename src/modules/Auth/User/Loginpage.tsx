import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

export default function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLFormElement>(null);
  const registerFormRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const recalcWrapperHeight = useCallback(() => {
    const wrapper = formWrapperRef.current;
    const activeForm = mode === "login" ? loginFormRef.current : registerFormRef.current;

    if (wrapper && activeForm) {
      wrapper.style.height = `${activeForm.offsetHeight}px`;
    }
  }, [mode]);

  useLayoutEffect(() => {
    recalcWrapperHeight();
  }, [mode, recalcWrapperHeight]);

  useEffect(() => {
    let observer: ResizeObserver | undefined;
    const activeForm = mode === "login" ? loginFormRef.current : registerFormRef.current;

    if (typeof ResizeObserver !== "undefined" && activeForm) {
      observer = new ResizeObserver(() => recalcWrapperHeight());
      observer.observe(activeForm);
    }

    return () => observer?.disconnect();
  }, [mode, recalcWrapperHeight]);

  useEffect(() => {
    recalcWrapperHeight();
  }, [
    recalcWrapperHeight,
    username,
    password,
    registerForm.username,
    registerForm.phone,
    registerForm.password,
    registerForm.confirmPassword,
  ]);

  const transitionClass = "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.24,0.82,0.25,1)]";
  const inputSharedClass =
    "block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-800 placeholder-gray-400 shadow-sm transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Điều hướng vào trang admin (dashboard)
      navigate("/dashboard");
    }, 1000);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username: regUsername, phone, password: regPassword, confirmPassword } = registerForm;

    if (!regUsername || !phone || !regPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin đăng ký!");
      return;
    }

    if (!/^(0|\+84)\d{9,10}$/.test(phone)) {
      alert("Số điện thoại chưa đúng định dạng. Vui lòng kiểm tra lại!");
      return;
    }

    if (regPassword.length < 6) {
      alert("Mật khẩu cần tối thiểu 6 ký tự để bảo mật tốt hơn!");
      return;
    }

    if (regPassword !== confirmPassword) {
      alert("Xác nhận mật khẩu chưa khớp!");
      return;
    }

    setIsRegisterLoading(true);

    setTimeout(() => {
      setIsRegisterLoading(false);
      alert("Đăng ký thành công! Vui lòng đăng nhập để bắt đầu trải nghiệm.");
      setMode("login");
      setRegisterForm({
        username: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }, 1200);
  };

  const handleToggleMode = (selectedMode: "login" | "register") => {
    if (selectedMode === mode) return;
    setMode(selectedMode);
    setIsLoading(false);
    setIsRegisterLoading(false);
    setRegisterForm({
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setUsername("");
    setPassword("");
  };

  const headerConfig = useMemo(() => {
    if (mode === "login") {
      return {
        icon: <LockClosedIcon className="w-10 h-10 text-white" />,
        title: "Đăng nhập",
        subtitle: "Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.",
      };
    }

    return {
      icon: <UserIcon className="w-10 h-10 text-white" />,
      title: "Tạo tài khoản",
      subtitle: "Khởi tạo hành trình mới với những trải nghiệm được cá nhân hoá.",
    };
  }, [mode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100/50 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300">
              {headerConfig.icon}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {headerConfig.title}
            </h1>
            <p className="text-gray-600">
              {headerConfig.subtitle}
            </p>
          </div>

          {/* Form */}
          <div
            ref={formWrapperRef}
            className="relative overflow-hidden rounded-2xl bg-white/80 px-6 py-6 sm:px-8 sm:py-8 transition-[height] duration-500 ease-[cubic-bezier(0.24,0.82,0.25,1)]"
          >
            <div
              className={`${transitionClass} transform-gpu ${mode === "login"
                  ? "opacity-100 translate-y-0 pointer-events-auto relative"
                  : "opacity-0 translate-y-6 pointer-events-none absolute inset-0"
                }`}
            >
              <form ref={loginFormRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={inputSharedClass}
                      placeholder="Nhập tên đăng nhập"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputSharedClass} pr-12`}
                      placeholder="Nhập mật khẩu"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-green-600 transition-colors duration-200"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-green-600 border border-gray-300 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                  >
                    Quên mật khẩu?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Đang đăng nhập...</span>
                    </>
                  ) : (
                    <>
                      <span>Đăng nhập</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            <div
              className={`${transitionClass} transform-gpu ${mode === "register"
                  ? "opacity-100 translate-y-0 pointer-events-auto relative"
                  : "opacity-0 -translate-y-6 pointer-events-none absolute inset-0"
                }`}
            >
              <form ref={registerFormRef} onSubmit={handleRegisterSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="register-username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="register-username"
                      type="text"
                      value={registerForm.username}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({ ...prev, username: e.target.value }))
                      }
                      className={inputSharedClass}
                      placeholder="Nhập tên đăng nhập mong muốn"
                      disabled={isRegisterLoading}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="register-phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="register-phone"
                      type="tel"
                      inputMode="tel"
                      value={registerForm.phone}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      className={inputSharedClass}
                      placeholder="0123 456 789"
                      disabled={isRegisterLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="register-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="register-password"
                      type="password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
                      }
                      className={inputSharedClass}
                      placeholder="Nhập mật khẩu"
                      disabled={isRegisterLoading}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 bg-green-50/60 border border-green-100 rounded-lg px-3 py-2 backdrop-blur-sm">
                    <span>Gồm tối thiểu 6 ký tự và có chữ cái, số.</span>
                    <span
                      className={`font-medium ${registerForm.password.length >= 6 ? "text-green-600" : "text-yellow-600"
                        }`}
                    >
                      {registerForm.password.length >= 6 ? "Ổn rồi!" : "Chưa đủ"}
                    </span>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="register-confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="register-confirm-password"
                      type="password"
                      value={registerForm.confirmPassword}
                      onChange={(e) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className={inputSharedClass}
                      placeholder="Nhập lại mật khẩu"
                      disabled={isRegisterLoading}
                    />
                  </div>
                  {registerForm.confirmPassword && (
                    <p
                      className={`text-xs font-medium ${registerForm.password === registerForm.confirmPassword
                        ? "text-green-600"
                        : "text-rose-500"
                        } transition-colors duration-200`}
                    >
                      {registerForm.password === registerForm.confirmPassword
                        ? "Mật khẩu đã khớp."
                        : "Mật khẩu chưa trùng khớp."}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isRegisterLoading}
                  className="w-full bg-gradient-to-r from-emerald-400 via-green-500 to-green-600 text-white py-3.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isRegisterLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Đang tạo tài khoản...</span>
                    </>
                  ) : (
                    <>
                      <span>Hoàn tất đăng ký</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            {mode === "login" ? (
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{" "}
                <button
                  type="button"
                  onClick={() => handleToggleMode("register")}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Đăng ký ngay
                </button>
              </p>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => handleToggleMode("login")}
                    className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    Đăng nhập
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  Chúng tôi cam kết bảo mật thông tin cá nhân và chỉ sử dụng với mục đích hỗ trợ trải nghiệm của bạn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

