import React, { useEffect } from "react";
import { Checkbox, DatePicker, Input, Radio, Select, Space } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { useRoleData } from "../../../components/hooks/useQueryData";
dayjs.extend(utc);

const Student = ({ nextStep, isLoading, data, setData, resErrors }) => {
  const { data: rolesList } = useRoleData();

  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields, isValid },
  } = useForm({
    defaultValues: data,
  });

  const saveData = (data) => {
    setData({ ...data });
    nextStep();
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Student Information
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  First Name:
                </label>
                <Controller
                  name="student.firstName"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter the first name"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.firstName?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Surname:
                </label>
                <Controller
                  name="student.surname"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter the surname"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.surname?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Email:
                </label>
                <Controller
                  name="student.email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="abc@gmail.com"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.email?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Username:
                </label>
                <Controller
                  name="student.username"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.username?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Home Phone:
                </label>
                <Controller
                  name="student.homePhone"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="es"
                      onChange={(phone) => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.homePhone?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Cellular:
                </label>
                <Controller
                  name="student.cellular"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="es"
                      onChange={(phone) => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.cellular?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Date of Birth:
                </label>
                <Controller
                  name="student.dob"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      ref={field.ref}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) => {
                        field.onChange(dayjs(date).local().format());
                      }}
                      format="DD/MM/YYYY"
                    />
                  )}
                />
                {errors?.student?.dob?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Birth Place:
                </label>
                <Controller
                  name="student.birthplace"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.student?.birthplace?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Min. Education Id:
                </label>
                <Controller
                  name="student.minEducId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                      disabled
                    />
                  )}
                />
                {errors?.student?.minEducId?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Role
                </label>
                <Controller
                  name="student.role"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                    cla
                      {...field}
                      defaultValue={field.defaultValue}
                      disabled
                    >
                      {rolesList?.map((item) => (
                        <Select.Option value={item?.id} key={item.id}>
                          {item?.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
                {errors?.student?.role?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Gender:
                </label>
                <Controller
                  name="student.gender"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Radio.Group
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    >
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                      <Radio value="others">Others</Radio>
                    </Radio.Group>
                  )}
                />
                {errors?.student?.gender?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-8">
          {isLoading ? (
            <div className="flex col-end-9 col-span-2 justify-center items-center rounded-full">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 px-6 py-2 text-white rounded-full bg-blue-light "
            >
              Next <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Student;
