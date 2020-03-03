
let abort={};

async getProductById({ productId, cb }, rootState) {
    if (abort["general"]) {
        abort["general"].cancel(); // cancel  previous ajax if exists
    }
    abort["general"] = axios.CancelToken.source();
    getProductById({ productId, general: abort["general"] || {} })
        .then((res) => {
            if (res && res.status === 200) {
                dispatch.product.setCurrProduct(res.data);
                cb && cb(null, res);
            }
        })
        .catch((err) => {
            if (axios.isCancel(err)) {
                // console.log("Previous request canceled", err.message);
            } else {
                cb && cb((err.response && err.response.data) || err);
            }
        });
}


export function getProductById({ productId, general }) {
    return axios.get(`/api/v1/products/${productId}`, { cancelToken: general.token });
}