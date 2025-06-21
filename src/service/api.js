// const BASE_URL="http://localhost:4000/api/v1"
const BASE_URL=import.meta.env.VITE_BASE_URL;
// console.log(BASE_URL);

export const modelEndPoints={
    MODEL_API:BASE_URL+"/model"
}

export const userEndPoints={
    USER_API:BASE_URL+"/user"
}