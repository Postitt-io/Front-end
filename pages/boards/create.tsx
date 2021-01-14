import Axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import InputGroup from '../../components/inputGroup';

export default function create() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState<Partial<any>>({});

  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post('/subs', {
        name,
        title,
        description,
      });
      router.push(`/p/${res.data.name}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex">
      <Head>
        <title>Create a Board</title>
      </Head>
      <div className="flex flex-col justify-center pl-6 text-gray-900 dark:text-gray-100">
        <div className="w-98">
          <h1 className="mb-2 text-2xl font-medium">
            Create a Board
          </h1>
          <hr />
          <form onSubmit={submitForm}>
            <div className="w-full">
              <p className="text-lg font-medium">Name</p>
              <p className="mb-2 text-xs text-gray-500">
                Careful! This can't be changed.
              </p>
              <InputGroup
                className="mb-2"
                type="text"
                value={name}
                setValue={setName}
                placeholder="Name"
                error={errors.name}
              />
              <p className="text-lg font-medium">Title</p>
              <p className="mb-2 text-xs text-gray-500">
                This represents the topic of your Board and can be
                changed at any time.
              </p>
              <InputGroup
                className="mb-2"
                type="text"
                value={title}
                setValue={setTitle}
                placeholder="Title"
                error={errors.title}
              />
              <p className="text-lg font-medium">Description</p>
              <p className="mb-2 text-xs text-gray-500">
                Give members insight into the rules/information on
                what your Board is about.
              </p>
              <textarea
                className="input-postitt"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              <small className="font-medium text-red-600">
                {errors.description}
              </small>
            </div>
            <div className="flex justify-end">
              <button className="my-2 font-medium text-md btn-postitt">
                Create Board
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error('Missing auth token cookie');

    await Axios.get('/auth/me', { headers: { cookie } });

    return { props: {} };
  } catch (err) {
    res.writeHead(307, { Location: '/login' }).end();
  }
};
