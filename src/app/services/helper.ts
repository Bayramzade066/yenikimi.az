import moment from "moment";

export const dateFormatter = (date=new Date(), format="DD.MM.YYYY HH:mm") => {
    return moment(date, format).format(format);
}



export const addStr = (str: any, index=29, stringToAdd='...') =>{
    let convert_str=String(str).toString();
    return (convert_str.length > index ) ? convert_str.substring(0, index) + stringToAdd : convert_str;
}

export const resetForm = (formRef: { current: any; }) => {
    let get_form=formRef.current;
    get_form.resetFields();
}


