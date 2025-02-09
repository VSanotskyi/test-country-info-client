import axios from 'axios';

import {baseURL} from "../constants/urls.ts";

export const instance  = axios.create({baseURL})