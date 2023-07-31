import React, { useEffect } from "react";
import { Input } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";

const Family = ({
  prevStep,
  nextStep,
  isLoading,
  data,
  setData,
  resErrors,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const saveData = (data) => {
    setData({ ...data });
    isPreviousClick ? prevStep() : nextStep();
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        <h3 className="flex justify-center text-lg underline underline-offset-2">
          Family Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Father's Name:
                </label>
                <Controller
                  name="family.fathersName"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="ABC"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.fathersName?.type === "required" && (
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
                  Father's Phone:
                </label>
                <Controller
                  name="family.fathersPhone"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="PQR"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.fathersPhone?.type === "required" && (
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
                  Mother's Name:
                </label>
                <Controller
                  name="family.mothersName"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="PQR"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.mothersName?.type === "required" && (
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
                  Mother's Phone:
                </label>
                <Controller
                  name="family.mothersPhone"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Bardaghat"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.mothersPhone?.type === "required" && (
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
                  Home Address:
                </label>
                <Controller
                  name="family.homeAddress"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Bardaghat"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.homeAddress?.type === "required" && (
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
                  Additional Phone:
                </label>
                <Controller
                  name="family.additionalPhone"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Bardaghat"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.additionalPhone?.type === "required" && (
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
                  Personal Incharge:
                </label>
                <Controller
                  name="family.personInCharge"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Mama"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.personInCharge?.type === "required" && (
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
                  Manager:
                </label>
                <Controller
                  name="family.manager"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Mama"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.manager?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-8">
          {isLoading ? (
            <div className="flex col-start-1 col-span-2 justify-center items-center  rounded-ful">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(true);
              }}
              type="back"
              className="flex col-start-1 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              <ImArrowLeft2 /> Prev
            </button>
          )}
          {isLoading ? (
            <div className="flex col-end-9 col-span-2 justify-center items-centertext-white rounded-full">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(false);
              }}
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              Next <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Family;
