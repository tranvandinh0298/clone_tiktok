import axios from 'axios';
console.log();
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
/**
 * đặt async trước 1 hàm thì khi gọi hàm đó sẽ trả về 1 promise
 * await là để chờ cho 1 logic được hoàn thành, sau đó mới tiếp tục logic tiếp theo 
 */
const get = async (path, params) => {
    const response = await request.get(path, params);
    return response.data;
};

export default request;
export { get };
