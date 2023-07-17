'use client';

import Input from '@/app/components/Input';
import Modal from '@/app/components/Modal';
import { DialogHeader } from '@/components/ui/dialog';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

// const ModalAddUser = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccessful, setIsSuccessful] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FieldValues>({
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     setIsLoading(true);
//     fetch('/api/users', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     })
//       .then(async (res) => {
//         if (res.ok) {
//           setIsSuccessful(true);
//         } else {
//           const { error } = await res.json();
//           throw new Error(error);
//         }
//       })
//       .catch((err) => {
//         toast.error(err.message);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <Modal
//       id="modal-new-user"
//       title="Add New User"
//       onSubmitted={handleSubmit(onSubmit)}
//       isLoading={isLoading}
//       isSuccessful={isSuccessful}
//     >
//       <form className="space-y-4">
//         <Input
//           label="Name"
//           id="name"
//           errors={errors}
//           type="text"
//           disabled={isLoading}
//           register={register}
//           icon={<UserCircleIcon />}
//         />
//         <Input
//           label="Email"
//           id="email"
//           errors={errors}
//           type="email"
//           disabled={isLoading}
//           register={register}
//           icon={<AtSymbolIcon />}
//         />
//       </form>
//     </Modal>
//   );
// };

// export default ModalAddUser;
