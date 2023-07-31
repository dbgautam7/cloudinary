import React, { useEffect } from "react";
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import { useStudentProfileMutation } from "../../../components/hooks/useMutateData";
import { useNavigate } from "react-router-dom";

const EducationHistory = ({
  prevStep,
  isLoading,
  data,
  setData,
  resErrors,
  setResErrors,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const navigate = useNavigate();
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();
  const studentProfileMutation = useStudentProfileMutation();

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
    isPreviousClick && prevStep();
  };

  const handleClickSubmit = async (data) => {
    console.log(data, "final data");
    setData({ ...data });
    try {
      const result = await studentProfileMutation.mutateAsync([
        "patch",
        `update/${data?.student?.id}`,
        data,
      ]);
      if (result?.success) {
        message.success("Student Profile updated sucessfully");
        navigate("/profile");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="w-full mt-10">
      <form
        onSubmit={
          isPreviousClick
            ? handleSubmit(saveData)
            : handleSubmit(handleClickSubmit)
        }
        className="flex flex-col gap-4"
      >
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Education's History Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Last Establishment:
                </label>
                <Controller
                  name="educationHistory.lastEstablishment"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="2050"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.educationHistory?.lastEstablishment?.type ===
                  "required" && <p className="text-sm text-red">Required</p>}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-5 font-semibold text-[15px] text-gray-2">
                  Last Grade:
                </label>
                <Controller
                  name="educationHistory.lastGrade"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="A+"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.educationHistory?.lastGrade?.type === "required" && (
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
                  Certificate:
                </label>
                <Controller
                  name="educationHistory.certificate"
                  control={control}
                  render={({ field }) => (
                    <Upload {...field}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                />
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
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              Sumbit <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EducationHistory;
