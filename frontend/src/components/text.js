import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import moment from "moment";
import { withRouter, Link, useHistory, useLocation } from "react-router-dom";
import { useModuleContext } from "context/ModuleProvider";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import bootbox from "bootbox";
import { videoImgLink } from "../helper";
import { pdfImgLink } from "../helper";
import { StickyContainer, Sticky } from "react-sticky";
import "react-circular-progressbar/dist/styles.css";
import "./UnitDetail.css";

function UnitDetail({ location }) {
  const server = process.env.REACT_APP_SERVER_URL;
  const { moduleId, currentModule } = useModuleContext();
  const [unit, setUnit] = useState([]);
  const [units, setUnits] = useState([]);
  let { subjectId, unitId, chapterId } = queryString.parse(location.search);
  const url = `${server}/${moduleId}/practice`;
  let paid = currentModule.paid;
  let params = {};
  unitId && (params.unitId = unitId);
  subjectId && (params.subjectId = subjectId);
  chapterId && (params.chapterId = chapterId);

  const getDetail = () => {
    axios({
      method: "get",
      url: `${url}/detail`,
      withCredentials: true,
      params,
    }).then((res) => {
      let { unit } = res.data;
      if (unit) {
        setUnit(unit);
      }
    });
  };

  const getUnit = () => {
    axios({
      method: "get",
      url: `${url}/allUnit`,
      withCredentials: true,
      params,
    }).then((res) => {
      let { units } = res.data;
      if (units) {
        setUnits(units);
      }
    });
  };

  useEffect(() => {
    getUnit();
  }, [url, subjectId]);

  useEffect(() => {
    getDetail();
  }, [url, subjectId, unitId]);

  return (
    <div className="w-100 p-0" id="dash__wrapper">
      <StickyContainer>
        <div className="row">
          <div className="col-md-3 col-12 px-sm-2 px-0 pt-sm-1 pt-sm-2 pt-0">
            <Sticky>
              {({ style }) => {
                return (
                  <div style={style}>
                    <CourseSummary
                      unit={unit}
                      units={units}
                      selectedId={unit.id}
                      moduleId={moduleId}
                      subjectId={subjectId}
                      chapterId={chapterId}
                    />
                  </div>
                );
              }}
            </Sticky>
          </div>
          <div className="col-md-9 bg__transparent mt-sm-2 mt-0 pt-sm-2 pt-0">
            <CourseDetail
              unit={unit}
              moduleId={moduleId}
              paid={paid}
              chapterId={chapterId}
              subjectId={subjectId}
            />
            {unit && unit.id && (
              <CourseHeader unit={unit} moduleId={moduleId} />
            )}
          </div>
        </div>
      </StickyContainer>
    </div>
  );
}

function CourseSummary({
  unit,
  units,
  selectedId,
  chapterId,
  moduleId,
  subjectId,
}) {
  const server = process.env.REACT_APP_SERVER_URL;
  let location = useLocation();
  const query = queryString.parse(location.search);
  const history = useHistory();
  const historySearch = query.search || "";
  const [search, setSearch] = useState(historySearch);

  const handleSubmit = (e) => {
    e.preventDefault();
    let search = e.target.search.value;
    history.replace(
      `${location.pathname}?subjectId=${subjectId}&search=${search}`
    );
    setSearch(search);
  };
  return (
    <div className="bg-white left--options radius-10 mt-2">
      <div className="search-container-discu">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon-discu">
                <i className="fas fa-search" />
              </span>
            </div>
            <input
              className="form-control border-muted bg-white"
              id="poll-search"
              name="search"
              placeholder="Search a unit..."
              type="text"
              defaultValue={search}
              aria-label="name"
              aria-describedby="basic-addon-discu"
            />
          </div>
        </form>
      </div>
      <div className="polls__discussion">
        <div className="polls-lists">
          <div className="main-discus" id="cours">
            <button
              style={{
                height: "40px",
                verticalAlign: "middle",
                width: "100%",
                border: "none",
                textAlign: "left",
              }}
              aria-controls="collapse__units"
              aria-expanded="true"
              className="text-primary d-block p-3 bg__transparent bg-white"
              data-toggle="collapse"
              href="#collapse__units"
            >
              <strong>
                <i className="fas fa-list-ul"></i>&nbsp;Units {}
              </strong>
              &nbsp;
              <span className="float-right">
                <i className="fa fa-chevron-down" />
              </span>
            </button>
            <div
              className={`collapse discus-container ${
                window.innerWidth > 640 && "show"
              }`}
              id="collapse__units"
            >
              {units &&
                units.map((u, i) => {
                  // console.log(u,"u")
                  u.solvedQuestion = 0;
                  u.totalQuestion = 0;
                  // let percentage = u.total_question > 0 ? (u.solvedQuestion / u.total_question) * 100 : 0;
                  // percentage = Math.round(percentage);
                  let active = selectedId === u.id;
                  i = i + 1;
                  return (
                    <Link
                      className="d-block unit__labels active"
                      to={`/${moduleId}/practice/unitDetail?subjectId=${subjectId}&unitId=${u.unit_id}`}
                      key={u.id}
                    >
                      <div className="row justify-content-around ">
                        {/* <div className="col-md-3 col-sm-3 col-2">
                          <img alt="unit" className="rounded-5 vote-photo" src={`${server}/images/unit/unit.jpg`} />
                        </div> */}
                        <div className="col-md-12  col-sm-9 col-10 d-flex flex-row vote-modal">
                          <div className="px-2">
                            <h6 className="polls_title mb-0 p-0">
                              {i + ". " + u.unit_name}
                            </h6>
                          </div>
                          {active && (
                            <div className="ninja__block px-2">
                              <span className="badge badge-light d-inline-block m-0">
                                Active
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="polls__discussion col-12">
                          <div className="polls-lists">
                            <div className="main-discus" id="cours">
                              <button
                                style={{
                                  height: "40px",
                                  verticalAlign: "middle",
                                  width: "100%",
                                  border: "none",
                                  textAlign: "left",
                                }}
                                aria-controls={`collapse__chapters${u.id}`}
                                aria-expanded="false"
                                className={`text-primary d-block p-3 bg__transparent bg-white collapsed`}
                                data-toggle="collapse"
                                href={`#collapse__chapters${u.id}`}
                              >
                                <strong>
                                  <i className="fas fa-list-ul"></i>
                                  &nbsp;Chapters
                                </strong>
                                &nbsp;
                                <span className="float-right">
                                  <i className="fa fa-chevron-down" />
                                </span>
                              </button>
                              <div
                                className={`${
                                  active ? "show" : "collapse"
                                } discus-container `}
                                id={`collapse__chapters${u.id}`}
                              >
                                {unit.chapters &&
                                  unit.chapters.map((c, j) => {
                                    // console.log(c.id,j,c,"@")
                                    let activeC = Number(chapterId) === c.id;
                                    j = j + 1;
                                    return (
                                      <div
                                        className="d-block unit__labels active"
                                        key={j}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          history.push(
                                            `/${moduleId}/practice/unitDetail?subjectId=${subjectId}&unitId=${c.unit_id}&chapterId=${c.id}`
                                          );
                                        }}
                                        // to={`/${moduleId}/practice/unitDetail?subjectId=${subjectId}&unitId=${c.unit_id}&chapterId=${c.id}`}
                                      >
                                        <div className="row vote-modal justify-content-around">
                                          <div className="col-md-12 col-sm-12 col-12 d-flex">
                                            <div className="px-2">
                                              <h6 className="polls_title mb-0 p-0">
                                                {i +
                                                  "." +
                                                  j +
                                                  " " +
                                                  c.chapter_name}
                                              </h6>
                                            </div>
                                            {activeC && (
                                              <div className="ninja__block py-0 px-2">
                                                <span className="badge badge-light d-inline-block m-0">
                                                  Active
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseHeader({ unit, moduleId }) {
  const server = process.env.REACT_APP_SERVER_URL;
  let {
    total_question,
    solvedQuestion,
    correctQuestion,
    completedChapter,
    chapters,
  } = unit;

  let lessonPercent = chapters && (completedChapter / chapters.length) * 100;
  let questionPercent =
    total_question > 0 ? solvedQuestion / total_question : 0;
  let performance = solvedQuestion > 0 ? correctQuestion / solvedQuestion : 0;
  lessonPercent = Math.round(lessonPercent);
  questionPercent = Math.round(questionPercent);
  performance = Math.round(performance);

  return (
    unit && (
      <div className="bg-white p-sm-3 p-0 chart_contain dash__shadow dash__border mt-3  ">
        <div className="card-header clearfix border-0 px-2 px-sm-4 scroll-fade mt-2">
          <div className="row">
            <div className="col-md-1">
              <img
                className="chapter-img"
                src={`/images/defaultUnit.jpg`}
                alt="Unit"
                style={{ width: "70px", marginLeft: "-10px" }}
              />
            </div>
            <div className="col-md-4">
              <h3
                className="card-title d-inline"
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#0d3b59",
                }}
              >
                {unit.unit_name}
              </h3>
              <div>
                <div
                  className="row"
                  style={{ color: "#7d7d7d", paddingTop: "10px" }}
                >
                  <div className="col-md-6" style={{ paddingLeft: "0px" }}>
                    <p className="pr-sm-0 pr-2">
                      <strong>{chapters && chapters.length}</strong>{" "}
                      Sub-categories
                    </p>
                    <p>
                      <strong>{unit.total_question}</strong> Questions
                    </p>
                  </div>
                  <div className="col-md-6 pl-0">
                    <p className="pr-sm-0 pr-2">
                      <strong>{unit.videosCount}</strong> Videos
                    </p>
                    <p>
                      <strong>
                        {moment
                          .utc(unit.videosLength * 1000)
                          .format("HH:mm:ss")}
                      </strong>
                      &nbsp;Duration
                    </p>
                  </div>
                </div>
              </div>
              {/* <div
                style={{
                  paddingTop: '5px',
                  fontSize: '14px',
                  color: 'gray',
                }}
              >
                <span>
                  <i className="far fa-envelope-open" />
                  &nbsp;1 
                </span>
                <span>
                  <i className="far fa-sticky-note"/>
                  &nbsp;4
                </span>
              </div> */}
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-4">
                  <div className="progressbar">
                    <div className="second circle">
                      <CircularProgressbarWithChildren
                        styles={buildStyles({
                          pathColor: "#58D68D",
                          trailColor: "#d5dbdb",
                        })}
                        value={lessonPercent}
                      >
                        <strong>{lessonPercent}%</strong>
                      </CircularProgressbarWithChildren>
                      <span>Lessons Completed</span>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="progressbar">
                    <div className="second circle">
                      <CircularProgressbarWithChildren
                        styles={buildStyles({
                          pathColor: "#58D68D",
                          trailColor: "#d5dbdb",
                        })}
                        value={questionPercent}
                      >
                        <strong>{questionPercent}%</strong>
                      </CircularProgressbarWithChildren>{" "}
                      <span>Questions Answered</span>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="progressbar">
                    <div className="second circle" data-percent={40}>
                      <CircularProgressbarWithChildren
                        styles={buildStyles({
                          pathColor: "#58D68D",
                          trailColor: "#d5dbdb",
                        })}
                        value={performance}
                      >
                        <strong>{performance}%</strong>
                      </CircularProgressbarWithChildren>
                      <span>Quiz Performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function CourseDetail({ unit, moduleId, paid, chapterId, subjectId }) {
  return (
    <div className="bg-white p-sm-3 p-0 dash__shadow dash__border d-flex flex-direction-column">
      <div className="card-body courses-grids pb-3 pt-0 px-2">
        {unit.chapters &&
          unit.chapters.map((c) => {
            // console.log(c,c.id,"%%%%")
            let access = parseInt(paid);
            // isIOS() && (access = true);
            let classId = access ? "fa-lock-open paid" : "fa-lock disable-lock";

            let paymentLink = `/${moduleId}/payment`;
            // let archiveLink = `/${moduleId}/practice/archive?chapterId=${c.chapters_id}`;

            const handleVideo = () => {
              if (c.videos && c.videos.length === 0) {
                bootbox.alert(
                  "Dear user, <br/><br/>Our videos are scheduled to premiere soon. Please contact the administration for further inquiries."
                );
              }
            };

            if (String(c.id) === chapterId) {
              return (
                <div className="row" key={c.id}>
                  <div className="col">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className="nav-link active"
                          href="#videos-tab"
                          data-toggle="tab"
                          role="tab"
                        >
                          Videos
                        </a>
                        <a
                          className="nav-link"
                          href="#pdf-tab"
                          data-toggle="tab"
                          role="tab"
                        >
                          PDF
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content">
                      <div
                        className="tab-pane active pt-3"
                        id="videos-tab"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <h5 className="course-video-title">
                              {c.chapter_name}
                            </h5>
                          </div>
                          {c.videos && c.videos.length !== 0 ? (
                            c.videos.map((video) => {
                              let videoImg = video
                                ? video.thumbnail
                                  ? videoImgLink(video.id)
                                  : "/images/defaultthumbnail.jpg"
                                : "/images/defaultthumbnail.jpg";
                              let videoLink =
                                video &&
                                `/${moduleId}/video/single?id=${video.id}`;
                              // let quizLink = `/${moduleId}/video/question?videoId=${video.id}`;

                              let enable = !video.premium || access;
                              classId = enable
                                ? "fa-lock-open paid"
                                : "fa-lock disable-lock";
                              return (
                                <div key={video.id} className="col-md-4">
                                  <Link
                                    to={enable ? videoLink : paymentLink}
                                    className="courses-grids-thumbnail"
                                  >
                                    <img
                                      src={videoImg}
                                      alt="video-title"
                                      className="img-responsive"
                                    />
                                    <span className="fas fa-play thumb-play" />
                                  </Link>
                                  <div className="second-block">
                                    <div className="second-block-title">
                                      <Link
                                        to={enable ? videoLink : paymentLink}
                                      >
                                        {video.title}
                                      </Link>
                                      <Link
                                        to={enable ? videoLink : paymentLink}
                                        className="float-right btn-tool"
                                      >
                                        <i className={`fas ${classId}`} />
                                      </Link>
                                    </div>
                                    <div className="second-block-time">
                                      <i className="far fa-clock" />
                                      &nbsp;&nbsp;
                                      {moment
                                        .utc(video.length * 1000)
                                        .format("HH:mm:ss")}
                                    </div>
                                    <div className="second-block-visibility">
                                      <p style={{ color: "#999" }}>
                                        Shared publicly{" "}
                                        {moment.utc(video.ent_date).fromNow()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="col-md-4" key={c.id}>
                              <div
                                onClick={handleVideo}
                                className="courses-grids-thumbnail"
                              >
                                <img
                                  src="/images/defaultthumbnail.jpg"
                                  alt="video-title"
                                  className="img-responsive"
                                />
                                <span className="fas fa-play thumb-play" />
                                {/* <span className="duration">03:15</span> */}
                              </div>
                              <div className="second-block">
                                <div className="second-block-title">
                                  <div onClick={handleVideo}>
                                    {c.chapter_name}
                                  </div>
                                  <div className="float-right btn-tool">
                                    <i className={`fas ${classId}`} />
                                  </div>
                                </div>
                                <div className="second-block-time"></div>
                                <div className="second-block-visibility">
                                  <p style={{ color: "#999" }}>
                                    {/* Shared publicly - 7:30 PM today */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div
                            className="tab-pane pt-3"
                            id="pdf-tab"
                            role="tabpanel"
                          >
                            <div className="row">
                              <div className="col-md-12">
                                <h5 className="course-video-title">
                                  {c.chapter_name}
                                </h5>
                              </div>
                              {c.files.length > 0 ? (
                                c.files.map((pdf) => {
                                  console.log(
                                    c.files.length,
                                    c.files,
                                    "555555"
                                  );
                                  const pdfLink =
                                    pdf &&
                                    `/${moduleId}/pdf/single?subjectId=${subjectId}&id=${pdf.id}`;
                                  const enable = !pdf.premium || access;
                                  let pdfImage = pdf
                                    ? pdf.thumbnail
                                      ? pdfImgLink(pdf.id)
                                      : "/images/pdf-thumbnail.png"
                                    : "/images/pdf-thumbnail.png";
                                  return (
                                    <div key={pdf.id} className="col-md-4 mb-4">
                                      <Link
                                        to={enable ? pdfLink : paymentLink}
                                        className="courses-grids-thumbnail"
                                      >
                                        <img
                                          src={pdfImage}
                                          alt="pdf"
                                          className="img-responsive"
                                        />
                                      </Link>
                                      <div className="second-block">
                                        <div
                                          className="second-block-title"
                                          style={{ textAlign: "center" }}
                                        >
                                          <Link
                                            to={enable ? pdfLink : paymentLink}
                                          >
                                            {pdf.title}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <h2 style={{ fontSize: "20px", color: "blue" }}>
                                  No pdf file found
                                </h2>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (String(!chapterId && unit.chapters[0].id === c.id)) {
              // else if (!chapterId) {
              // console.log (!chapterId && unit.chapters[0].id === c.id,"bool")
              return (
                <div className="row" key={c.id}>
                  <div className="col">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className="nav-link active"
                          href="#videos-tab"
                          data-toggle="tab"
                          role="tab"
                        >
                          Videos
                        </a>
                        <a
                          className="nav-link"
                          href="#pdf-tab"
                          data-toggle="tab"
                          role="tab"
                        >
                          PDF
                        </a>
                      </div>
                    </nav>
                    <div className="tab-content">
                      <div
                        className="tab-pane active pt-3"
                        id="videos-tab"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <h5 className="course-video-title">
                              {c.chapter_name}
                            </h5>
                          </div>
                          {c.videos && c.videos.length !== 0 ? (
                            c.videos.map((video) => {
                              let videoImg = video
                                ? video.thumbnail
                                  ? videoImgLink(video.id)
                                  : "/images/defaultthumbnail.jpg"
                                : "/images/defaultthumbnail.jpg";
                              let videoLink =
                                video &&
                                `/${moduleId}/video/single?id=${video.id}`;
                              // let quizLink = `/${moduleId}/video/question?videoId=${video.id}`;

                              let enable = !video.premium || access;
                              classId = enable
                                ? "fa-lock-open paid"
                                : "fa-lock disable-lock";
                              return (
                                <div key={video.id} className="col-md-4">
                                  <Link
                                    to={enable ? videoLink : paymentLink}
                                    className="courses-grids-thumbnail"
                                  >
                                    <img
                                      src={videoImg}
                                      alt="video-title"
                                      className="img-responsive"
                                    />
                                    <span className="fas fa-play thumb-play" />
                                  </Link>
                                  <div className="second-block">
                                    <div className="second-block-title">
                                      <Link
                                        to={enable ? videoLink : paymentLink}
                                      >
                                        {video.title}
                                      </Link>
                                      <Link
                                        to={enable ? videoLink : paymentLink}
                                        className="float-right btn-tool"
                                      >
                                        <i className={`fas ${classId}`} />
                                      </Link>
                                    </div>
                                    <div className="second-block-time">
                                      <i className="far fa-clock" />
                                      &nbsp;&nbsp;
                                      {moment
                                        .utc(video.length * 1000)
                                        .format("HH:mm:ss")}
                                    </div>
                                    <div className="second-block-visibility">
                                      <p style={{ color: "#999" }}>
                                        Shared publicly{" "}
                                        {moment.utc(video.ent_date).fromNow()}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="col-md-4">
                              <div
                                onClick={handleVideo}
                                className="courses-grids-thumbnail"
                              >
                                <img
                                  src="/images/defaultthumbnail.jpg"
                                  alt="video-title"
                                  className="img-responsive"
                                />
                                <span className="fas fa-play thumb-play" />
                                {/* <span className="duration">03:15</span> */}
                              </div>
                              <div className="second-block">
                                <div className="second-block-title">
                                  <div onClick={handleVideo}>
                                    {c.chapter_name}
                                  </div>
                                  <div className="float-right btn-tool">
                                    <i className={`fas ${classId}`} />
                                  </div>
                                </div>
                                <div className="second-block-time"></div>
                                <div className="second-block-visibility">
                                  <p style={{ color: "#999" }}>
                                    {/* Shared publicly - 7:30 PM today */}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="tab-pane pt-3"
                        id="pdf-tab"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <h5 className="course-video-title">
                              {c.chapter_name}
                            </h5>
                          </div>
                          {c.files.length > 0 ? (
                            c.files.map((pdf) => {
                              console.log(c.files.length, c.files, "555555");
                              const pdfLink =
                                pdf &&
                                `/${moduleId}/pdf/single?subjectId=${subjectId}&id=${pdf.id}`;
                              const enable = !pdf.premium || access;
                              let pdfImage = pdf
                                ? pdf.thumbnail
                                  ? pdfImgLink(pdf.id)
                                  : "/images/pdf-thumbnail.png"
                                : "/images/pdf-thumbnail.png";
                              return (
                                <div key={pdf.id} className="col-md-4 mb-4">
                                  <Link
                                    to={enable ? pdfLink : paymentLink}
                                    className="courses-grids-thumbnail"
                                  >
                                    <img
                                      src={pdfImage}
                                      alt="pdf"
                                      className="img-responsive"
                                    />
                                  </Link>
                                  <div className="second-block">
                                    <div
                                      className="second-block-title"
                                      style={{ textAlign: "center" }}
                                    >
                                      <Link to={enable ? pdfLink : paymentLink}>
                                        {pdf.title}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <h2 style={{ fontSize: "20px", color: "blue" }}>
                              No pdf file found
                            </h2>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return <></>;
            }
          })}
      </div>
    </div>
  );
}

export default withRouter(UnitDetail);

// if (text && image && audio) {
//   // Upload text, image, and audio
// } else if (text && image) {
//   // Upload text and image
// } else if (text && audio) {
//   // Upload text and audio
// } else if (text) {
//   // Upload text only
// } else {
//   // Text is compulsory, so cannot upload only image or audio
//   // Display an error message
// }

// switch (true) {
//     case (text && image && audio):
//         // Upload text, image, and audio
//         break;
//     case (text && image):
//         // Upload text and image
//         break;
//     case (text && audio):
//         // Upload text and audio
//         break;
//     case (text):
//         // Upload text only
//         break;
//     default:
//         // Text is compulsory, so cannot upload only image or audio
//         // Display an error message
//         break;
// }

// let questionText = question.question.text;

// if (question.question.image && question.question.audio) {
//   let questionImage = `test${testId}_QN${index + 1}_question`;
//   if (typeof question.question.image !== typeof "string") {
//     await uploadImage(question.question.image, questionImage, dir);
//   }
//   let questionAudio = `test${testId}_QN${index + 1}_question`;
//   if (typeof question.question.audio !== typeof "string") {
//     await uploadAudio(question.question.audio, questionAudio, dir);
//   }
//   question.question = questionText + addImageTag(questionImage) + addAudioTag(questionAudio);
//   question.questionImage = `${quizImagesPath}/${questionImage}.png`;
//   question.questionAudio = `${quizImagesPath}/${questionAudio}.mp3`;
// } else if (question.question.image) {
//   let questionImage = `test${testId}_QN${index + 1}_question`;
//   if (typeof question.question.image !== typeof "string") {
//     await uploadImage(question.question.image, questionImage, dir);
//   }
//   question.question = questionText + addImageTag(questionImage);
//   question.questionImage = `${quizImagesPath}/${questionImage}.png`;
//   question.questionAudio = null;
// } else if (question.question.audio) {
//   let questionAudio = `test${testId}_QN${index + 1}_question`;
//   if (typeof question.question.audio !== typeof "string") {
//     await uploadAudio(question.question.audio, questionAudio, dir);
//   }
//   question.question = questionText + addAudioTag(questionAudio);
//   question.questionAudio = `${quizImagesPath}/${questionAudio}.mp3`;
//   question.questionImage = null;
// } else {
//   // Only text is selected
//   question.question = questionText;
//   question.questionImage = null;
//   question.questionAudio = null;
// }
