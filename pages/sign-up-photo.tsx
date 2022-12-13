/* eslint-disable react-hooks/rules-of-hooks */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setSignUp } from '../services/auth';
import { CategoryTypes } from '../services/data-types';
import { getGameCategory } from '../services/player';

export default function signUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState('');
  const [image, setImage] = useState<any>('');
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [localForm, setLocalForm] = useState({
    name: '',
    email: '',
  });
  const router = useRouter();

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory();
    // console.log('category ', data);
    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalForm = localStorage.getItem('user-form');
    setLocalForm(JSON.parse(getLocalForm!));
    // console.log(getLocalForm);
  }, []);

  const onSubmit = async () => {
    // console.log('image', image);
    // console.log('favorite', favorite);
    const getLocalForm = await localStorage.getItem('user-form');
    const form = JSON.parse(getLocalForm!);
    const data = new FormData();

    data.append('image', image);
    data.append('email', form.email);
    data.append('password', form.password);
    data.append('phoneNumber', '085694368836'); // default
    data.append('name', form.name);
    data.append('username', form.name);
    data.append('favorite', favorite);
    data.append('role', 'user'); // default
    data.append('status', 'Y'); // default

    const result = await setSignUp(data);
    if (result.error) {
      toast.error(result.message, {
        theme: 'colored',
      });
    } else {
      toast.success('Register Berhasil');
      router.push('/sign-up-success');
      localStorage.removeItem('user-form');
    }
    // console.log('result: ', result);
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form>
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="image">
                    {imagePreview ? <Image width={120} height={120} src={imagePreview} className="img-upload" alt="upload" /> : <Image src="/icon/upload.svg" width={120} height={120} className="img-upload" alt="upload" />}
                  </label>
                  {/* kalo buat input yg biasa dia 'event.target.value'
                   kalo buat masukin gambar ' event.target.files' */}
                  <input
                    id="image"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      // console.log(event.target.files);
                      const img = event.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localForm.name}</h2>
              <p className="text-lg text-center color-palette-1 m-0">{localForm.email}</p>
              <div className="pt-50 pb-50">
                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">
                  Favorite Game
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(event) => {
                    const selectedFavorite = event.target.value;
                    setFavorite(selectedFavorite);
                  }}
                >
                  {categories.map((category: CategoryTypes) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16" type="button" onClick={onSubmit}>
                Create My Account
              </button>
              <Link href="">
                <a className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15" role="button">
                  Terms & Conditions
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

// 1. gua harus daept categories buat ditaro di favorites, category diambil dari API categories
