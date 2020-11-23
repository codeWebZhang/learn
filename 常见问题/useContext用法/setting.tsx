import * as React from 'react';
import SettingForm ,{Generation} from './useContest';
import Video from './video';

export default SettingForm.create()(function SettingForm(){
    return (
        <>
            <Generation>
                {
                 getFieldDecorator =>
                 getFieldDecorator({title:"url"})(<Video />)   
                }
            </Generation>
        </>
    )
})