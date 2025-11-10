import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Chào mừng đến với HKSMS
          </h1>
          <p className="text-xl text-gray-600">
            Hệ thống quản lý hiện đại và tinh tế
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ChartBarIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Dashboard
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Xem tổng quan thống kê và báo cáo
            </p>
            <Link
              to="/dashboard"
              className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center gap-1 group"
            >
              Xem thêm
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <UsersIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Người dùng
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Quản lý người dùng và phân quyền
            </p>
            <Link
              to="/users"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 group"
            >
              Xem thêm
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Cog6ToothIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cài đặt
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Cấu hình hệ thống và tài khoản
            </p>
            <Link
              to="/settings"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm inline-flex items-center gap-1 group"
            >
              Xem thêm
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

