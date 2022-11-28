/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Input from '../../components/atoms/Input';
import Sidebar from '../../components/organisms/sidebar';
import { JWTPayloadsTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

interface UserStateTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: any;
}

export default function EditProfile() {
  const [user, setUser] = useState<UserStateTypes>({
    avatar: '',
    name: '',
    username: '',
    email: '',
    id: '',
    // phone: '',
  });
  const [imagePreview, setImagePreview] = useState('/');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadsTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      // console.log('data edit', userFromPayload);
      const IMG = process.env.NEXT_PUBLIC_IMG;
      user.avatar = `${IMG}/${userFromPayload.avatar}`;
      // console.log('gambar', user.avatar);
      setUser(userFromPayload);
    }
  }, []);

  const router = useRouter();

  const onSubmit = async () => {
    // console.log('datakekumpuledit', user);

    const data = new FormData();
    data.append('image', user.avatar);
    data.append('name', user.name);
    data.append('username', user.username);

    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message, {
        theme: 'colored',
      });
    } else {
      toast.success('Berhasil melakukan update', {
        theme: 'colored',
      });
      Cookies.remove('token');
      router.push('/sign-in');
    }
    // console.log('responseeeee', response);
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview === '/' ? (
                      <img src={user.avatar} alt="" width="90" height="90" className="avatar img-fluid rounded-circle" />
                    ) : (
                      <img src={imagePreview} alt="" width="90" height="90" className="avatar img-fluid rounded-circle" />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Nama Lengkap"
                  value={user.name}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }
                />
              </div>

              <div className="pt-30">
                <Input
                  label="User Name"
                  value={user.username}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      username: event.target.value,
                    })
                  }
                />
              </div>

              <div className="pt-30">
                <Input label="Email" disabled value={user.email} />
              </div>
              <div className="button-group d-flex flex-column pt-50">
                <button type="button" className="btn btn-save fw-medium text-lg text-white rounded-pill" onClick={onSubmit}>
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }
  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadsTypes = jwtDecode(jwtToken);
  const userFromPayload: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    props: {
      user: userFromPayload,
    },
  };
}
