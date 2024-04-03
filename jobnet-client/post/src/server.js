import { createServer, Model, Response } from 'miragejs'

createServer({
  models: {
    user: Model,
    business: Model,
  },

  seeds(server) {
    server.create('user', {
      id: 1,
      email: 'jobseeker@gmail.com',
      password: '12345',
      name: 'Miles Morales',
      role: 'Jobseeker',
    })
  },

  routes() {
    this.namespace = 'api'
    this.timing = 500

    this.post('/auth/login', (schema, request) => {
      const { email, password } = JSON.parse(request.requestBody)
      const user = schema.users.findBy({ email, password })
      if (!user)
        return new Response(
          401,
          {},
          { message: 'No user with those credentials found!' }
        )

      user.password = undefined
      return {
        data: {
          user,
          accessToken: "Enjoy your pizza, here's your tokens.",
        },
      }
    })

    this.post('/auth/signup', (schema, request) => {
      const { name, email, phoneNumber, password } = JSON.parse(
        request.requestBody
      )
      const user = schema.users.findBy({ email })
      if (user)
        return new Response(409, {}, { message: 'This email is already used!' })

      return {
        data: {
          id: 101010,
          name,
          email,
          phoneNumber,
        },
        message: 'Account registed successfully',
      }
    })

    this.get('jobseekers', ()=>{
      return {
        data: [
          {
            id: 1,
            name: 'Nguyễn Quang Hải',
            username: 'quanghai19',
            email: "quanghai1@gmail.com",
            phone: "0739201724",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 2,
            name: 'Nguyễn Công Phượng',
            username: 'congphuong10',
            email: "cp10@gmail.com",
            phone: "0739421724",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 3,
            name: 'Quế Ngọc Hải',
            username: 'haique4',
            email: "quangochai@gmail.com",
            phone: "0394731724",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 4,
            name: 'Đặng Văn Lâm',
            username: 'vanlam01',
            email: "vanlam@gmail.com",
            phone: "0947383884",
            verification_status: 'Pending',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 5,
            name: 'Nguyễn Duy Mạnh',
            username: 'duyman123',
            email: "duymanh@gmail.com",
            phone: "0382939932",
            verification_status: 'Pending',
            job_search_status: 'Awaiting Response',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 6,
            name: 'Phan Tuấn Tài',
            username: 'tuantai123',
            email: "tuantai@gmail.com",
            phone: "0377472893",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 7,
            name: 'Nguyễn Tiến Linh',
            username: 'tienlinh09',
            email: "tienlinh@gmail.com",
            phone: "0377382932",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Premium",
            image: '/vite.svg',
          },
          {
            id: 8,
            name: 'Nguyễn Tuấn Hải',
            username: 'tuanhai',
            email: "tuanhai@gmail.com",
            phone: "0733201724",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 9,
            name: 'Đỗ Hùng Dũng',
            username: 'hungdung',
            email: "dunghung@gmail.com",
            phone: "0739201253",
            verification_status: 'Verified',
            job_search_status: 'On hold',
            account_type: "Premium",
            image: '/vite.svg',
          },
          {
            id: 10,
            name: 'Nguyễn Thanh Bình',
            username: 'thanhbinh',
            email: "thanhbinh@gmail.com",
            phone: "03859263245",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 11,
            name: 'Nguyễn Thành Chung',
            username: 'thanhchung',
            email: "thanhchung@gmail.com",
            phone: "0725221724",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Premium",
            image: '/vite.svg',
          },
          {
            id: 12,
            name: 'Nguyễn Hoàng Đức',
            username: 'hoangduc',
            email: "hoangduc@gmail.com",
            phone: "0739229324",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 13,
            name: 'Nguyễn Văn Quyết',
            username: 'vanquyet',
            email: "vanquyet@gmail.com",
            phone: "03743829222",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 14,
            name: 'Nguyễn Tuấn Anh',
            username: 'tuananh',
            email: "tuananh@gmail.com",
            phone: "03748293844",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Free",
            image: '/vite.svg',
          },
          {
            id: 15,
            name: 'Đoàn Văn Hậu',
            username: 'vanhau',
            email: "vanhau@gmail.com",
            phone: "0739211724",
            verification_status: 'Verified',
            job_search_status: 'Actively Search',
            account_type: "Premium",
            image: '/vite.svg',
          },

        ],
      }
    })

    this.get('/businesses', () => {
      return {
        data: [
          {
            id: 1,
            name: 'Jobnet JPJ 1',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1001,
          },
          {
            id: 2,
            name: 'Jobnet JPJ 2',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1002,
          },
          {
            id: 3,
            name: 'Jobnet JPJ 3',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1003,
          },
          {
            id: 4,
            name: 'Jobnet JPJ 4',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1004,
          },
          {
            id: 5,
            name: 'Jobnet JPJ 5',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1005,
          },
          {
            id: 6,
            name: 'Jobnet JPJ 6',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1006,
          },
          {
            id: 7,
            name: 'Jobnet JPJ 7',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1007,
          },
          {
            id: 8,
            name: 'Jobnet JPJ 8',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1008,
          },
          {
            id: 9,
            name: 'Jobnet JPJ 9',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 1009,
          },
          {
            id: 10,
            name: 'Jobnet JPJ 10',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10010,
          },
          {
            id: 11,
            name: 'Jobnet JPJ 11',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10011,
          },
          {
            id: 12,
            name: 'Jobnet JPJ 12',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10012,
          },
          {
            id: 13,
            name: 'Jobnet JPJ 13',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10013,
          },
          {
            id: 14,
            name: 'Jobnet JPJ 14',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10014,
          },
          {
            id: 15,
            name: 'Jobnet JPJ 15',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10015,
          },
          {
            id: 16,
            name: 'Jobnet JPJ 16',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10016,
          },
          {
            id: 17,
            name: 'Jobnet JPJ 17',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10017,
          },
          {
            id: 18,
            name: 'Jobnet JPJ 18',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10018,
          },
          {
            id: 19,
            name: 'Jobnet JPJ 19',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10019,
          },
          {
            id: 20,
            name: 'Jobnet JPJ 20',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10020,
          },
          {
            id: 21,
            name: 'Jobnet JPJ 21',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10021,
          },
          {
            id: 22,
            name: 'Jobnet JPJ 22',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10022,
          },
          {
            id: 23,
            name: 'Jobnet JPJ 23',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10023,
          },
          {
            id: 24,
            name: 'Jobnet JPJ 24',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10024,
          },
          {
            id: 25,
            name: 'Jobnet JPJ 25',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10025,
          },
          {
            id: 26,
            name: 'Jobnet JPJ 26',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10026,
          },
          {
            id: 27,
            name: 'Jobnet JPJ 27',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10027,
          },
          {
            id: 28,
            name: 'Jobnet JPJ 28',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10028,
          },
          {
            id: 29,
            name: 'Jobnet JPJ 29',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10029,
          },
          {
            id: 30,
            name: 'Jobnet JPJ 30',
            description:
              'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.Với hơn 10 năm kinh nghiệm, FPT Telecom International không ngừng mang đến các sản phẩm, dịch vụ đổi mới, nắm bắt sự thay đổi trong cách thức giao tiếp, làm việc của con người và các tổ chức trong thời đại kỹ thuật...',
            image: '/business.png',
            backgroundImage: '/business.png',
            totalWorks: 10030,
          },
        ],
      }
    })

    this.get('/categories', () => {
      return {
        data: [
          { id: 1, name: 'Category 1', image: '/vite.svg', totalWorks: 3001 },
          { id: 2, name: 'Category 2', image: '/vite.svg', totalWorks: 3002 },
          { id: 3, name: 'Category 3', image: '/vite.svg', totalWorks: 3003 },
          { id: 4, name: 'Category 4', image: '/vite.svg', totalWorks: 3004 },
          { id: 5, name: 'Category 5'},
          { id: 6, name: 'Category 6', image: '/vite.svg', totalWorks: 3006 },
          { id: 7, name: 'Category 7', image: '/vite.svg', totalWorks: 30077 },
        ],
      }
    })

    this.get('/benefits', () => {
      return {
        data: [
          { id: 1, name: 'Benefit 1' },
          { id: 2, name: 'Benefit 2' },
          { id: 3, name: 'Benefit 3' },
          { id: 4, name: 'Benefit 4' },
          { id: 5, name: 'Benefit 5'},
          { id: 6, name: 'Benefit 6'},
          { id: 7, name: 'Benefit 7'},
        ],
      }
    })

    this.get('/experiences', () => {
      return {
        data: [
          { id: 1, name: 'Experience 1' },
          { id: 2, name: 'Experience 2' },
          { id: 3, name: 'Experience 3' },
          { id: 4, name: 'Experience 4' },
          { id: 5, name: 'Experience 5' },
          { id: 6, name: 'Experience 6' },
          { id: 7, name: 'Experience 7' },
        ],
      }
    })

    this.get('/posts', () => {
      return {
        data: [
          {
            id: 1,
            title: 'Java Developer 1',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 2,
            title: 'Java Developer 2',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 3,
            title: 'Java Developer 3',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 4,
            title: 'Java Developer 4',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 5,
            title: 'Java Developer 5',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 6,
            title: 'Java Developer 6',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 7,
            title: 'Java Developer 7',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 8,
            title: 'Java Developer 8',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 9,
            title: 'Java Developer 9',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 10,
            title: 'Java Developer 10',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 11,
            title: 'Java Developer 11',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 12,
            title: 'Java Developer 12',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 13,
            title: 'Java Developer 13',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 14,
            title: 'Java Developer 14',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 15,
            title: 'Java Developer 15',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 16,
            title: 'Java Developer 16',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 17,
            title: 'Java Developer 17',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 18,
            title: 'Java Developer 18',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 19,
            title: 'Java Developer 19',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 20,
            title: 'Java Developer 20',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 21,
            title: 'Java Developer 21',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 22,
            title: 'Java Developer 22',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 23,
            title: 'Java Developer 23',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 24,
            title: 'Java Developer 24',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 25,
            title: 'Java Developer 25',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 26,
            title: 'Java Developer 26',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 27,
            title: 'Java Developer 27',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 28,
            title: 'Java Developer 28',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 29,
            title: 'Java Developer 29',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
          {
            id: 30,
            title: 'Java Developer 30',
            image: '/vite.svg',
            minSalary: 10,
            maxSalary: 15,
            type: 'Full-time',
            business: 'Công ty cổ phần công nghệ - viễn thông Elcom',
          },
        ],
      }
    })

    this.get('/notifications', () => {
      return {
        data: [
          {
            id: 1,
            title: 'Nhà tuyển dụng A đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 2,
            title: 'Nhà tuyển dụng B đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 3,
            title: 'Nhà tuyển dụng C đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 4,
            title: 'Nhà tuyển dụng D đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 5,
            title: 'Nhà tuyển dụng E đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 6,
            title: 'Nhà tuyển dụng F đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 7,
            title: 'Nhà tuyển dụng G đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 8,
            title: 'Nhà tuyển dụng H đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 9,
            title: 'Nhà tuyển dụng I đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 10,
            title: 'Nhà tuyển dụng K đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 11,
            title: 'Nhà tuyển dụng 1 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 12,
            title: 'Nhà tuyển dụng 2 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 13,
            title: 'Nhà tuyển dụng 3 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 14,
            title: 'Nhà tuyển dụng 4 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 15,
            title: 'Nhà tuyển dụng 5 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 16,
            title: 'Nhà tuyển dụng 6 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 17,
            title: 'Nhà tuyển dụng 7 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 18,
            title: 'Nhà tuyển dụng 8 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 19,
            title: 'Nhà tuyển dụng 9 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 20,
            title: 'Nhà tuyển dụng 10 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 21,
            title: 'Nhà tuyển dụng 11 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 22,
            title: 'Nhà tuyển dụng 12 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 23,
            title: 'Nhà tuyển dụng 13 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 24,
            title: 'Nhà tuyển dụng 14 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 25,
            title: 'Nhà tuyển dụng 15 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 26,
            title: 'Nhà tuyển dụng 16 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 27,
            title: 'Nhà tuyển dụng 17 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 28,
            title: 'Nhà tuyển dụng 18 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 29,
            title: 'Nhà tuyển dụng 19 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
          {
            id: 30,
            title: 'Nhà tuyển dụng 20 đã xem CV của bạn',
            content:
              'Tìm việc làm ở website của chúng tôi với sự tích hợp của model GPT',
            createdAt: '5 phút trước',
          },
        ],
      }
    })
    this.get('/categories', () => {
      return {
        data: [
          {
            id: 1,
            name: 'Kinh doanh/bán hàng',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 2,
            name: 'IT/Phần mềm',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 3,
            name: 'Hành chính/Văn phòng',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 4,
            name: 'Giáo dục/Đào tạo',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 5,
            name: 'Tư vấn',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 6,
            name: 'Marketing/Truyền thông',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 7,
            name: 'Vận tải/Kho vận',
            image: 'image',
            totalWorks: 20,
          },
          {
            id: 8,
            name: 'Kế toán/Kiểm toán',
            image: 'image',
            totalWorks: 20,
          },
        ],
      }
    })
    this.get('/experiments', () => {
      return {
        data: [
          { id: 1, years: "Dưới 1 năm", },
          { id: 2, years: "Trên 1 năm", },
          { id: 3, years: "2 năm", },
          { id: 4, years: "3 năm", },
          { id: 5, years: "Trên 5 năm", },
        ]
      }
    })
    this.get('/benefits', () => {
      return {
        data: [
          {
            id: 1,
            name: "Bảo hiểm y tế",
            desc: "Để đảm bảo sức khỏe và phúc lợi của bạn, bạn có nhiều chương trình y tế khác nhau để lựa chọn tùy thuộc vào tình hình và nhu cầu riêng của bạn. Từ một phần đến bảo hiểm y tế đầy đủ, chúng tôi đã bảo hiểm cho bạn."
          },
          {
            id: 2,
            name: "Cơ hội phát triển nghề nghiệp",
            desc: "Bao giờ cảm thấy bế tắc với sự nghiệp của bạn? Chúng tôi không thuê bạn chỉ vì chúng tôi cần lấp chỗ trống. Cùng nhau, chúng tôi sẽ giúp bạn định hình và phát triển sự nghiệp của mình để bạn có thể tiến xa hơn và khám phá lại mục đích thực sự của mình trong công việc."
          },
          {
            id: 3,
            name: "Bảo hiểm",
            desc: "Những điều bất ngờ có thể xảy ra vào những thời điểm không mong muốn. Chúng tôi chi trả các chi phí bảo hiểm cơ bản cho bạn và người thân của bạn trong trường hợp khẩn cấp hoặc sự cố không may. Bạn cũng có thể nâng cấp gói của mình bất cứ lúc nào bạn muốn."
          },
          {
            id: 4,
            name: "Quà tặng",
            desc: "Chúng tôi tin rằng mọi đóng góp của bạn, dù lớn hay nhỏ, đều có giá trị và xứng đáng được đánh giá cao. Đối với công việc khó khăn của bạn, chúng tôi thể hiện sự công nhận thông qua những món quà và phiếu mua hàng hấp dẫn mà bạn có thể sử dụng để tự thưởng cho mình."
          },
          {
            id: 5,
            name: "Hỗ trợ laptop, thiết bị làm việc",
            desc: "Cần một máy tính xách tay hoặc một số thiết bị cụ thể cho công việc? Đó là vào chúng tôi. Chúng tôi sẽ cung cấp các công cụ cần thiết mà bạn cần để bạn có thể tập trung vào những gì bạn làm tốt nhất và hoàn thành công việc."
          },
          {
            id: 6,
            name: "Cơ hội phát triển chuyên môn",
            desc: "Mỗi nhân viên là một tài sản vô giá đối với bất kỳ nhóm nào; đó là lý do tại sao chúng tôi muốn giúp bạn phát triển. Nâng cao kỹ năng và chuyên môn của bạn thông qua các chương trình hợp tác phát triển chuyên nghiệp của chúng tôi với các tổ chức đáng chú ý. Chúng tôi sẽ trang trải các chi phí."
          },
          {
            id: 6,
            name: "Nghỉ phép",
            desc: "Cảm thấy cần phải nghỉ làm một thời gian ngắn? công ty chúng tôi khá linh hoạt khi nghỉ việc; có thể là cho những ngày nghỉ phép, ốm đau, cá nhân hoặc sức khỏe tâm thần. Chỉ cần thảo luận về những gì bạn cần và chúng tôi sẽ cố gắng đáp ứng những nhu cầu đó."
          },
        ]
      }
    })
    this.get('/industries', () => {
      return {
        data: [
          {
            id: 1,
            name: 'Sale',
            category: 'Kinh doanh/bán hàng',
          },
          {
            id: 2,
            name: 'Java Developer',
            category: 'IT Phần mềm',
          },
          {
            id: 3,
            name: 'Tổ trưởng',
            category: 'Hành chính văn phòng',
          },
          {
            id: 4,
            name: 'Giảng viên tiếng Anh',
            category: 'Giáo dục đào tạo',
          },
          {
            id: 5,
            name: 'Kỹ thuật viên',
            category: 'Tư vấn',
          },
          {
            id: 6,
            name: 'Kỹ thuật viên',
            category: 'Marketing/Truyền thông',
          },
          {
            id: 7,
            name: 'Tài xế xe tải',
            category: 'Vận tải/Kho vận',
          },
          {
            id: 8,
            name: 'Kế toán ngân hàng',
            category: 'Kế toán/Kiểm toán',
          },
        ],
      }
    })
  },
})
