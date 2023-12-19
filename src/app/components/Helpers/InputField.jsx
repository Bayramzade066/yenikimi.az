import { Form, Input, Typography } from 'antd';
import { useRef } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import React, { useEffect } from 'react';
import MaskedInput from "react-text-mask";
import runes from 'runes2';


const phoneNumberMask = [
    '+',
    '9',
    '9',
    '4',
    ' ',
    "(",
    /[1-9]/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
];

const InputField = (props) => {
    const { label, name, rules, placeholder, onChange, className, type, value, readOnly, form, maxs = false } = props;

    const onChangeEvent = () => {
        // onChange();

    }

    return (
        <>
            <Form.Item
                label={label}
                name={name}

                // rules={[
                //     { min: 8, message: 'Şifrənin uzunluqu minimum 8 xarakter olmalıdır' },
                //     { required: rules?.required, message: rules?.message }
                // ]}
                shouldUpdate={(prevValues, curValues) => {
                    return prevValues !== curValues;
                }}
            >
                {
                    type == 'password' ?
                        <Input.Password
                            max={6}
                             iconRender={(visible) => (visible ? <EyeInvisibleOutlined />  : <EyeTwoTone  />)}
                            // iconRender={(visible) => (visible ? "" : "")}
                            placeholder={placeholder}
                            onChange={onChangeEvent}
                            className={`${className}`}
                            form={form}
                        /> : type == 'tel' ? <MaskedInput

                            mask={phoneNumberMask}
                            className={`ant-input ${className}`}
                            placeholder={placeholder}
                            guide={true}
                            onChange={onChangeEvent}
                            form={form}
                        /> :

                            <Input                          
                                type={type ?? 'text'}
                                value={value}
                                placeholder={placeholder}
                                onChange={onChangeEvent}
                                className={className}
                                readOnly={readOnly ?? false}
                                form={form}
                            />
                }
            </Form.Item>
        </>
    )
}

export default InputField;