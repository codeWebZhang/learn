### 感知平台 行内编辑表格 前后字段有依赖关系
 - column定义字段代表每一行，在第一列触发编辑态，展示自定义table
 - 重写table表格components的row属性
 - 每个row新建form表单（Form.create）,并用上下文监测form
 - 编辑态提交按钮，消费该form （EditableContext.Consumer）
 - 字段onchange改变数据源，setDatas 重新render页面，改变数据，
    编辑态的表单字段是非受控组件，利用重新render页面，<Form.Item>的initialValue重新赋值，从而字段改变



### 抓拍人脸库 左侧表单多个字段 用context封装
- const FormContext: any = createContext(null); 新建context
- 新建class表单（Form），定义实例对象（ this.values={} ),定义setVal，getVal方法
- 创建表单函数，通过new Form（）保存实例到 usestate中，用 （<FormContext.Provider value={from}>{props.children}
   <Row>
      <Button>搜索</Button>
   <Row>
   </FormContext.Provider>） 包裹
<!-- 重点  -->
- 封装 SearchFormItem。
   1.首先获取provider中的value 
   2.SearchFormItem 组件参数接受 children，并 return childred(getFieldDecorator);
   3. getFieldDecorator 函数 return ('自定义元素')=>{ return cloneElement('自定义元素',{...other})};
   4. other参数包括onchange方法，此方法传递通过provider传递下来的Form实例参数，调用表单Form的setVal方法赋值；参数还包括name，value等等直接传递给
      cloneElement返回的元素，也就是页面渲染的元素
   5.<SearchFormItem>{(callback)=>{ return callback('name')('自定义组件')}}</SearchFormItem>；