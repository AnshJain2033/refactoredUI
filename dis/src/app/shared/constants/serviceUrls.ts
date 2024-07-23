import { urls } from "./urls";

export const serviceUrls: any = {
    login: urls.gateway + '/signin',
    signup: urls.gateway + '/newSignup',
    getActiveUserId: urls.user + '/userFeignClientController/getUserId',
    forgotPassword: urls.gateway + '/forgotPassword',
    resetPassword: urls.gateway + '/processResetPassword',
    verifyToken: urls.gateway + '/verifyToken',
    getFacultydata: urls.user + '/staffProfile/getFacultyData',
    getSideNavigationDetails: urls.user + '/sideNavigation/getSideNavigationDetails',
    createMeeting: urls.administration + '/meeting/createMeeting',
    getPastMeetings: urls.administration + '/meeting/getPastMeetings',
    getFutureMeetings: urls.administration + '/meeting/getFutureMeetings',
    getCurrentMeetings: urls.administration + '/meeting/getCurrentMeetings',
    getAllMeetingAttendees: urls.administration + '/meeting/getAllMeetingAttendants',
    getPastMeetingAttendees: urls.administration + '/meeting/getPastMeetingAttendants',
    markMeetingAttendance: urls.administration + '/meeting/markMeetingAttendance',
    getComplaintList: urls.administration + '/getComplaints',
    getAllComplaintList: urls.administration + '/getAllComplaints',
    updateMeeting: urls.administration + '/meeting/updateMeeting',
    deleteMeeting: urls.administration + '/meeting/deleteMeeting',
    getComplaints: urls.administration + '/getComplaints',
    getMyComplaints: urls.administration + '/getMyCreatedComplaints',
    getComplaintPendingStates: urls.administration + '/getComplaintPendingStates',
    addStudentComplaint: urls.administration + '/addStudentComplaint',
    addCleanlinessComplaint: urls.administration + '/addCleanlinessComplaint',
    addOtherComplaint: urls.administration + '/addOtherComplaint',
    addCWNComplaint: urls.administration + '/addCWNComplaint',
    addECCWComplaint: urls.administration + '/addECCWComplaint',
    addEMRComplaint: urls.administration + '/addEMRSComplaint',
    addTelephoneComplaint: urls.administration + '/addTelephoneComplaint',
    addLEComplaint: urls.administration + '/addLEComplaint',
    getStudentList: urls.administration + '/getStudentList',
    getComplaintCount: urls.administration + '/getComplaintCount',
    getStudentFullNameList: urls.administration + '/getStudentFullNameList',
    resolveComplaint: urls.administration + '/resolveComplaint',
    rejectComplaint: urls.administration + '/rejectComplaint',
    getInfrastructureByType: urls.infrastructure + '/infrastructure/getInfrastructureByType',
    getInfrastructureTypeLists: urls.infrastructure + '/infrastructure/getInfrastructureTypeLists',
    getListOfInfrastructureLocations: urls.infrastructure + '/infrastructure/getListOfInfrastructureLocations',
    getFacultyNameList: urls.infrastructure + '/infrastructure/getFacultyNameList',
    getStaffNameList: urls.infrastructure + '/infrastructure/getStaffNameList',
    addNewInfrastructure: urls.infrastructure + '/infrastructure/addNewInfrastructure',
    deleteInfrastructure: urls.infrastructure + '/infrastructure/deleteInfrastructure',
    getInfrastructurebyId: urls.infrastructure + '/infrastructure/getInfrastructurebyId',
    updateInfrastructure: urls.infrastructure + '/infrastructure/updateInfrastructure',
    addNewInfrastructureLocation: urls.infrastructure + '/infrastructure/addNewInfrastructureLocation',
    searchTaskByUserId: urls.user + '/task/searchTaskByUserId',
    getMyUserId: urls.user + '/staffProfile/getMyUserID',
    getStaffBasicProfile: urls.user + '/staffBasicProfile',
    addStaffBasicProfile: urls.user + '/addStaffBasicProfile',
    userWorkExperience: urls.user + '/userWorkExperience',
    addUserWorkExperience: urls.user + '/addUserWorkExperience',
    userResearchWork: urls.user + '/userResearchWork',
    addUserResearchWork: urls.user + '/addUserResearchWork',
    userInternship: urls.user + '/userInternship',
    addUserInternship: urls.user + '/addUserInternship',
    userCompetitiveExams: urls.user + '/userCompetitiveExams',
    addUserCompetitiveExams: urls.user + '/addUserCompetitiveExams',
    userCulturalActivityAchievements: urls.user + '/userCulturalActivityAchievements',
    userTechnicalActivity: urls.user + '/userTechnicalActivity',
    addUserCulturalActivityAchievements: urls.user + '/addUserCulturalActivityAchievements',
    addUserTechnicalActivity: urls.user + '/addUserTechnicalActivity',
    getStaffdata: urls.user + '/staffProfile/getStaffData',
    getPanelOfTheory: urls.user + '/panel/getPanelOfTheory',
    createPanelOfTheory: urls.user + '/panel/createPanelOfTheory',
    deletePanelOfTheory: urls.user + '/panel/deletePanelOfTheory',
    updatePanelOfTheory: urls.user + '/panel/updatePanelOfTheory',
    getAllSubjects: urls.academics + '/scheme/getAllSubjects',
    getPanelOfPractical: urls.user + '/panelOfPractical',
    updatePanelOfPractical: urls.user + '/panelOfPractical',
    getExternalExaminar: urls.user + '/externalExaminer',
    createPanelOfPractical: urls.user + '/panelOfPractical',
    getActiveTaskList: urls.user + '/task/getAssignTasksInfo',
    addStudentMember: urls.academics + '/MagazineService/addMember',
    deletePanelOfPractical: urls.user + '/panelOfPractical',
    getTaskStatusList: urls.user + '/task/getTaskStatusList',
    getUGCourseBatches: urls.user + '/guideAllotment/getAllBatches',
    getCategoryList: urls.user + '/task/getTaskCategoryList',
    getTaskByCategory: urls.user + '/task/getTasksFromCategoryId',
    assignTask: urls.user + '/task/assignTask',
    deleteTask: urls.user + '/task/deleteTask',
    addMemberDetails: urls.user + '/staffProfile/addNewMember',
    getExpertLectureByStatus: urls.academics + '/expertLecture/getExpertLecturesByStatus',
    getExpertLectureById: urls.academics + '/expertLecture/viewExpertLectureDetails',
    deleteExpertLecture: urls.academics + '/expertLecture/deleteExpertLecture',
    getExperts: urls.academics + '/expertLecture/getAllExperts',
    getExpertLectures: urls.academics + '/expertLecture/getAllExpertLectures',
    addExpert: urls.academics + '/expertLecture/addExpert',
    editExpert: urls.academics + '/expertLecture/editExpert',
    addExpertLecture: urls.academics + '/expertLecture/addExpertLecture',
    updateExpertLectureByStatus: urls.academics + '/expertLecture/updateExpertLectureStatus',
    editExpertLecture: urls.academics + '/expertLecture/editExpertLecture',
    getCourseList: urls.academics + '/timeTable/getCourseList',
    updatePanel: urls.user + '/panelOfPractical',
    getAllExternals: urls.user + '/externalExaminer',
    getAllIndustryVisitsByStatus: urls.academics + '/industryVisit/getIndustryVisits',
    addIndustryVisit: urls.academics + '/industryVisit/addIndustryVisit',
    deleteIndustryVisit: urls.academics + '/industryVisit/deleteIndustryVisit',
    editIndustryVisit: urls.academics + '/industryVisit/editIndustryVisit',
    updateIndustryVisitStatus: urls.academics + '/industryVisit/updateIndustryVisitStatus',
    updateTaskStatus : urls.user + '/task/updateTaskStatus',

    // Url For Magazine Module
    deleteMagazine: urls.academics + '/magazine/deleteMagazine',
    getMagazineDetails: urls.academics + '/magazine/viewMagazineDetails',
    retrievePendingMagazine: urls.academics + '/magazine/getMagazineByStatus/pending',
    retrieveUpcomingMagazine: urls.academics + '/magazine/getMagazineByStatus/upcoming',
    retrieveCompletedMagazine: urls.academics + '/magazine/getMagazineByStatus/completed',
    addMember: urls.academics + '/magazine/addMember',
    retrieveMember: urls.academics + '/magazine/getMembers',
    addMagazine: urls.academics + '/magazine/addMagazine',
    editMagazine: urls.academics + '/magazine/editMagazine',
    editMember: urls.academics + '/magazine/editMember',
    deleteMember: urls.academics + '/magazine/deleteMember',

    //moodle
    moodleLogin: urls.moodle + '/moodle/token',
    moodleUserDetails: urls.moodle + '/moodle/getUserDetails',
    allMoodleCourses : urls.moodle + '/moodle/getAllCourses',
    getAllGrades : urls.moodle + '/moodle/getUserGradeReport',
    getAssignmentDetails : urls.moodle + '/moodle/getAssignmentDetails',
    getAllEnrolledCourses: urls.moodle + '/moodle/getAllEnrolledCourses',


  };