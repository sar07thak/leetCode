import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const signupSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data) => {
    console.log(data);

    // Backend data ko send kar dena chaiye?  
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-700" > {/* Centering container */}
      <div className="card w-96 bg-base-100 shadow-xl "> {/* Existing card styling */}
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl text-[#E5A600]">Leetcode</h2> {/* Centered title */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Existing form fields */}
          

            <div className="form-control  mt-4">
              <label className="label mb-1">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered ${errors.emailId && 'input-error'}`}
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error">{errors.emailId.message}</span>
              )}
            </div>

            <div className="form-control mt-4">
              <label className="label mb-1">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered ${errors.password && 'input-error'}`}
                {...register('password')}
              />
              {errors.password && (
                <span className="text-error">{errors.password.message}</span>
              )}
            </div>

            <div className="form-control mt-6 flex justify-center">
              <button
                type="submit"
                className="btn btn-warning "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;





//* const [name, setName] = useState("");
//*   const [email, setEmail] = useState("");
//*   const [password, setPassword] = useState("");
//*   const [errors, setErrors] = useState({});

//*   function validateForm() {
//*     const newErrors = {};

//*     if (!name.trim()) {
//*       newErrors.name = "Name is required";
//*     }

//*     if (!email.trim()) {
//*       newErrors.email = "Email is required";
//*     } else if (!/^\S+@\S+\.\S+$/.test(email)) {
//*       newErrors.email = "Invalid email format";
//*     }

//*     if (!password.trim()) {
//*       newErrors.password = "Password is required";
//*     } else if (password.length < 6) {
//*       newErrors.password = "Password must be at least 6 characters";
//*     }

//*     return newErrors;
//*   }

//*   function handleSubmit(e) {
//*     e.preventDefault();
//*     const validationErrors = validateForm();
//*     setErrors(validationErrors);

//*     if (Object.keys(validationErrors).length === 0) {
//*       console.log("Form Data:", { name, email, password });
//       // Optionally clear the form here
//*       setName("");
//*       setEmail("");
//*       setPassword("");
//*     }
//*   }

//*   return (
//*     <div className="h-screen flex justify-center items-center bg-gray-100">
//*       <form
//*         onSubmit={handleSubmit}
//*         className="flex flex-col gap-4 w-full max-w-md p-6 border-2 border-gray-300 rounded-2xl shadow-lg bg-white"
// *      >
//*       <h2 className="text-2xl font-semibold text-center text-gray-700">
//*           Sign Up
//*         </h2>

//*         <div>
//*           <input
//*            type="text"
//             value={name}
//             placeholder="Enter Your First Name"
//             onChange={(e) => setName(e.target.value)}
//             className="px-4 py-2 w-full border border-gray-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700"
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//         </div>

//         <div>
//           <input
//             type="email"
//             value={email}
//             placeholder="Enter Your Email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="px-4 py-2 w-full border border-gray-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700"
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//         </div>

//         <div>
//           <input
//             type="password"
//             value={password}
//             placeholder="Enter Your Password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="px-4 py-2 w-full border border-gray-300 rounded-lg text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-700"
//           />
//           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );