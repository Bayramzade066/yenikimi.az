import { useEffect, useRef, useState } from 'react'
import InputCom from '../Helpers/InputCom'
import PageTitle from '../Helpers/PageTitle'
import Layout from '../Partials/Layout'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { PlusOne } from '@material-ui/icons'
import CheckIcon from '@material-ui/icons/Check'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
export default function AddProcuct() {
  const [Deli, setDelivery] = useState(false)

  const [Category, setCategory] = useState(0)
  const [ItemType, setItemType] = useState(10)
  const [City, setCity] = useState(10)

  const [selectedImages, setSelectedImages] = useState([])

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    if(selectedImages.length === 11){
      setSelectedImages([])
    }
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))

    // FOR BUG IN CHROME
    event.target.value = ''
  }

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  const categoryChange = (event) => {
    setCategory(event.target.value)
  }
  const itemChange = (event) => {
    setItemType(event.target.value)
  }
  const cityChange = (event) => {
    setCity(event.target.value)
  }

  const Delivery = () => {
    setDelivery(!Deli)
  }

  const profileImgInput = useRef(null)
  const browseProfileImg = () => {
    profileImgInput.current.click()
  }

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="become-saller-wrapper w-full">
        <div className="title">
          <PageTitle
            title="Məhsul yarat"
            breadcrumb={[
              { name: 'home', path: '/' },
              { name: 'Məhsul yarat', path: '/add-product' },
            ]}
          />
        </div>
        <div className="content-wrapper w-full mb-10">
          <div className="container-x mx-auto">
            <div className="w-full bg-white sm:p-[30px] p-3">
              <div className="flex xl:flex-row flex-col xl:space-x-11">
                <div className="xl:w-[824px] ">
                  <div className="title w-full mb-4">
                    <h1 className="text-[22px] font-semibold text-qblack mb-1">
                      Məhsul haqqında
                    </h1>
                    <p className="text-[15px] text-qgraytwo">
                      Məhsulun məlumatlarını aşaqıdaki xanalara əlavə edin
                    </p>
                  </div>
                  <div className="input-area">
                    <span>Kateqoriyalar*</span>
                    <FormControl className="w-full ">
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        value={Category}
                        onChange={categoryChange}
                        className="!h-[40px] "
                      >
                        <option value={0} className="font-bold !ml-5">
                          Geyim
                        </option>
                        <option value={1}>Papaq</option>
                        <option value={2}>Hoodie</option>
                        <option value={3} className="font-bold !ml-5">
                          Ayaqqabı
                        </option>
                        <option value={4}>İdman</option>
                        <option value={5}>Bot</option>
                      </Select>
                    </FormControl>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5 mt-3">
                      <InputCom
                        placeholder="Məhsulun adı (başlıq)"
                        label="Məhsul adı*"
                        name="fname"
                        type="text"
                        inputClasses="h-[50px]"
                      />

                      <InputCom
                        placeholder="Marka və ya brendi yazın"
                        label="Marka/Brend*"
                        name="model"
                        type="text"
                        inputClasses="h-[50px]"
                      />
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <div className="flex flex-col w-full h-full">
                        <span>Məhsul növü*</span>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={ItemType}
                            onChange={itemChange}
                            className="!h-[40px]"
                          >
                            <MenuItem value={10}>Yeni məhsul</MenuItem>
                            <MenuItem value={20}>2-ci əl məhsul</MenuItem>
                            <MenuItem value={30}>İcarə</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="flex flex-col w-full h-full">
                        <span>Şəhər*</span>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={City}
                            onChange={cityChange}
                            className="!h-[40px]"
                          >
                            <MenuItem value={10}>Bakı</MenuItem>
                            <MenuItem value={20}>Xırdalan</MenuItem>
                            <MenuItem value={30}>Sumqayıt</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="remember-checkbox flex items-center space-x-2.5 mb-3 justify-end">
                      <button
                        onClick={Delivery}
                        type="button"
                        className="w-5 h-5 text-qblack flex justify-center items-center border border-light-gray"
                      >
                        {Deli && <CheckIcon className="text-qyellow" />}
                      </button>
                      <span
                        onClick={Delivery}
                        className="text-base text-qblack"
                      >
                        Çatdırılma
                      </span>
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <InputCom
                        placeholder="Qiyməti daxil edin"
                        label="Məhsulun qiyməti*"
                        name="price"
                        type="number"
                      />
                      <InputCom
                        placeholder="yenikimi@gmail.com"
                        label="Email adresiniz*"
                        name="email"
                        type="email"
                      />
                    </div>
                    <div className="!h-[100px] input-field placeholder:text-sm text-sm text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none  mb-5">
                      <InputCom
                        placeholder="haqqında ümumi məlumat"
                        label="Məhsulun məzmunu*"
                        name="address"
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1 mt-5 sm:mt-0 mb-10 xl:mb-0">
                  <div className="update-profile w-full mb-9">
                    <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
                      Məhsulun şəkilləri
                    </h1>
                    <p className="text-sm text-qgraytwo mb-5">
                      <span className="ml-1 text-qblack">
                        Maksimum{' '}
                        <span className="text-red-600 font-bold text-md">
                          5mb həcm
                        </span>
                        , ən az{' '}
                        <span className="text-red-600 font-bold text-md">
                          1
                        </span>{' '}
                        ən çox{' '}
                        <span className="text-red-600 font-bold text-md">
                          10
                        </span>{' '}
                        şəkil əlavə etməlisiniz.
                      </span>
                    </p>
                    <div className="flex flex-col gap-5 xl:justify-center justify-start">
                      <section>
                        <input
                          ref={profileImgInput}
                          type="file"
                          name="images"
                          onChange={onSelectFile}
                          multiple
                          className="hidden"
                          accept="image/png , image/jpeg, image/webp"
                        />
                        <div
                          onClick={browseProfileImg}
                          className="w-full h-[35px]  flex justify-center items-center  bottom-7 text-center sm:right-5 right-[100px] bg-qyellow rounded-md cursor-pointer"
                        >
                          <span className="font-bold">Şəkil əlavə edin</span>{' '}
                          <AddAPhotoIcon className=" ml-3 mb-1" />
                        </div>
                        <br />
                        {selectedImages[0] && selectedImages.length < 11 ? ( <div>
                        <button className={`text-red-600 font-bold text-md`} onClick={() => deleteHandler(selectedImages[0])} >  x </button>                
                          <img
                            src={selectedImages[0]}
                            alt="upload"
                            className={`
                               sm:!w-[250px] sm:!h-[150px]
                            w-[250px] h-[200px] rounded-md overflow-hidden object-cover`}
                          />
                        </div> ) : ''}
                        <div className={`grid ${selectedImages.length < 11 && 'grid-cols-4 sm:grid-cols-3'}  w-full h-full gap-5`} >
                          {selectedImages && selectedImages.length < 11 ?
                            selectedImages.map((image, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`${index == 0 && 'hidden'}`}
                                >
                                  <button
                                    className={`text-red-600 font-bold text-md`}
                                    onClick={() => deleteHandler(image)}
                                  >
                                    x
                                  </button>
                                  <img
                                    src={image}
                                    alt="upload"
                                    className={` sm:w-[75px] sm:h-[75px] w-[75px] h-[75px] rounded-md overflow-hidden object-cover`}
                                  />
                                </div>
                              )
                            }) : <span className="w-full text-red-500">
                            10-dan az şəkil daxil edin
                          </span>}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
