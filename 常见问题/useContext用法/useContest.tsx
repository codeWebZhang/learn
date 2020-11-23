import React, { useContext } from 'react';


let WrapItem = {} as any;
WrapItem.create = () => {
    return Child => {
        // 切记 返回react组件
        class F React.Component < any, any > {
            render() {
                return <ProviderItem {...this.props}
                >
                    {Child}
                </ProviderItem>
            }
        }
    }
}
const Provider = React.createContext(null);
const ProviderItem = (props) => {
    const obj = {
        attr: { name: "zhang", age: 21 }, fn: () => { console.log('function') }

    };
    const { attr, fn } = obj;
    //错误写法 函数外定义Provider
    // const Provider = useContext(null);
    const [form, setForm] = React.useState({ attr, fn });
    return <ProviderItem.Provider value={form}>
        <div>
            {props.children}
        </div>
    </ProviderItem.Provider>
}

const Generation = ({ child }) => {
    const form = React.useContext(Provider);
    const getFieldDecorator = (options) => {
        let { attr, fn } = form;
        return Input => {
            return (
                <div>
                    {React.cloneElement(Input, { attr, fn, ...options })}
                </div>
            )
        }
    }
    return child(getFieldDecorator);
}

export default WrapItem;
export { Generation };
