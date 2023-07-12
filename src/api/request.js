import axios from "axios";
import * as CONS from "./constants";
import { getToken } from "../utils/token";

export async function registerUserData(data) {
  try {
    const res = await axios.post(CONS.register, data);
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function loginUserData(data) {
  try {
    const res = await axios.post(CONS.login, data);
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function checkSession() {
	const token = getToken('token');

	try {
		const res = await axios.get(CONS.session, {
			headers: {
				'token': token,
			}
		});
		return res.data;
	}
	catch(err) {
		return err;
	}
}

export async function createPostData(data) {
  const token = getToken('token');

  try {
    const res = await axios.post(CONS.postData, data, {
      headers: {
        'token': token,
      }
    });
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function getAllPostData() {
  const token = getToken('token');

  try {
    const res = await axios.get(CONS.postData, {
      headers: {
        'token': token,
      }
    });
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function getAllUserPostData() {
  const token = getToken('token');

  try {
    const res = await axios.get(`${CONS.postData}/all`, {
      headers: {
        'token': token,
      }
    });
    return res.data;
  }
  catch(err) {
    return err;
  }
}


export async function getPotsByDateData(date, type) {
  const token = getToken('token');

  try {
    const res = await axios.get(`${CONS.postData}/date/${date}/${type}`, {
      headers: {
        'token': token,
      }
    });
    return res.data;
  }
  catch(err) {
    return err;
  }
}

export async function getPostByTextDate(text) {
  const token = getToken('token');

  try {
    const res = await axios.get(`${CONS.postData}/text/${text}`, {
      headers: {
        'token': token,
      }
    });
    return res.data;
  }
  catch(err) {
    return err;
  }
}
