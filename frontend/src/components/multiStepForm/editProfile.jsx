import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import {
  ShimmerCircularImage,
  ShimmerText,
  ShimmerBadge,
  ShimmerThumbnail,
  ShimmerTitle,
} from "react-shimmer-effects";
import profileImg from "../../../images/profile2.png";
import Stepper from "./stepper";
import Student from "./student";
import Address from "./address";
import Identification from "./identification";
import Family from "./family";
import EducationHistory from "./educationHistory";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import { message } from "antd";

const EditProfile = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPreviousClick, setIsPreviousClick] = useState(false);
  const [resErrors, setResErrors] = useState({});
  const location = useLocation();

  const isLoading = location?.state?.isLoading;
  const isError = location?.state?.isError;

  if (isError) {
    return message.error("Error in fetching data");
  }

  const dataList = useMemo(
    () => location?.state?.data && location?.state?.data[0],
    [location?.state?.data]
  );

  const [data, setData] = useState({
    student: {
      id: dataList && dataList?.student?.id,
      birthplace: dataList && dataList?.student?.birthplace,
      cellular: dataList && dataList?.student?.cellular,
      dob: dataList && dataList?.student?.dob,
      email: dataList && dataList?.student?.email,
      homePhone: dataList && dataList?.student?.homePhone,
      firstName: dataList && dataList?.student?.firstName,
      surname: dataList && dataList?.student?.surname,
      gender: dataList && dataList?.student?.gender,
      username: dataList && dataList?.student?.username,
      minEducId: dataList && dataList?.student?.minEducId,
      role: dataList && dataList?.student?.role?.id,
    },

    address: {
      address1: dataList && dataList?.address?.address1,
      address2: dataList && dataList?.address?.address2,
      country: dataList && dataList?.address?.country,
      department: dataList && dataList?.address?.department,
      municipality: dataList && dataList?.address?.municipality,
      village: dataList && dataList?.address?.village,
    },
    identification: {
      birthCertificate: dataList && dataList?.identification?.birthCertificate,
      document: dataList && dataList?.identification?.document,
      documentId: dataList && dataList?.identification?.documentId,
    },
    family: {
      additionalPhone: dataList && dataList?.family?.additionalPhone,
      fathersName: dataList && dataList?.family?.fathersName,
      fathersPhone: dataList && dataList?.family?.fathersPhone,
      homeAddress: dataList && dataList?.family?.homeAddress,
      manager: dataList && dataList?.family?.manager,
      mothersName: dataList && dataList?.family?.mothersName,
      mothersPhone: dataList && dataList?.family?.mothersPhone,
      personInCharge: dataList && dataList?.family?.personInCharge,
    },
    educationHistory: {
      certificate: dataList && dataList?.educationHistory?.certificate,
      lastEstablishment:
        dataList && dataList?.educationHistory?.lastEstablishment,
      lastGrade: dataList && dataList?.educationHistory?.lastGrade,
    },
  });

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, true, "white");
  }, [width]);

  return (
    <>
      <div className="flex items-center my-10 ml-0 md:pl-6 sm:my-0 sm:pt-[28px] sm:bg-white sm:pb-3 sm:shadow-md sm:fixed sm:top-0 sm:w-full sm:z-[1000]">
        <Link to="/profile">
          <HiOutlineArrowLeft className="cursor-pointer" />
        </Link>
        <div className="ml-4 font-bold text-2xl sm:text-xl">Edit Profile</div>
      </div>
      <div className="sm:mt-20 ml-4 sm:p-6 flex md:block md:ml-0">
        <div className="w-[20%] md:w-[100%]">
          <div className="flex justify-center">
            {isLoading ? (
              <ShimmerCircularImage size={150} />
            ) : (
              <img src={profileImg} alt="img" className="mb-[14px]" />
            )}
          </div>
          <div className="flex justify-center items-center">
            {isLoading ? (
              <ShimmerText line={1} />
            ) : (
              <div
                className="mb-10 font-medium text-[15px] w-[130px]
                h-[29px]
                text-cyan border flex justify-center items-center
                 border-cyan rounded-[100px] cursor-pointer"
              >
                Change Photo
              </div>
            )}
          </div>
          <div className="flex justify-center items-center md:hidden">
            {isLoading ? (
              <ShimmerText line={1} />
            ) : (
              <div
                className="mb-10 font-medium text-[15px] w-[176px] h-[42px]
                text-white gap-[10px] flex justify-center items-center
                 bg-cyan rounded-[100px] cursor-pointer"
              >
                Update Profile
              </div>
            )}
          </div>
        </div>
        <div className="ml-20 w-[60%] md:w-[70%]">
          {isLoading ? (
            <ShimmerTitle line={1} />
          ) : (
            <Stepper
              isLoading={isLoading}
              activeStep={activeStep}
              resErrors={resErrors}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 1 ? (
            <Student
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setData={setData}
              nextStep={() => setActiveStep(2)}
            />
          ) : activeStep === 2 ? (
            <Address
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(1)}
              nextStep={() => setActiveStep(3)}
            />
          ) : activeStep === 3 ? (
            <Identification
              data={data}
              isLoading={isLoading}
              resErrors={resErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(2)}
              nextStep={() => setActiveStep(4)}
            />
          ) : activeStep === 4 ? (
            <Family
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(3)}
              nextStep={() => setActiveStep(5)}
            />
          ) : (
            <EducationHistory
              isLoading={isLoading}
              data={data}
              resErrors={resErrors}
              setResErrors={setResErrors}
              setData={setData}
              isPreviousClick={isPreviousClick}
              setIsPreviousClick={setIsPreviousClick}
              prevStep={() => setActiveStep(4)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
