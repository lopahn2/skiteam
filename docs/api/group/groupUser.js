module.exports = {
    "/group/user": {
      get: {
        tags: ["Group"],
        summary: "유저가 속한 스터디 그룹 전체 불러오기",
        description: "유저가 속한 스터디 그룹 전체 불러오기",
        responses: {
          200: {
            description: "유저가 속한 스터디 그룹 전체 불러오기",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                        type: "string",
                        description: "유저가 속한 스터디 그룹 조회 메시지",
                        example: "id가 속한 그룹을 모두 보냅니다"
                    },
                    groupsSelectReseult: {
                        type: "object",
                        description: "스터디 그룹 전체 정보",
                        example: [{room_info_1:"방 정보",room_info_2:"방 정보",room_info_3:"방 정보"}],
                    }
                  },
                },
              },
            },
          },
          409: {
            description: "Conflict",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    error: {
                        type: "string",
                        description: "에러 코드 메시지",
                        example: "Conflict",
                    },
                    message: {
                        type: "string",
                        description: "에러 세부 내용",
                        example: "DB Conflict 발생. 잠시 후 다시 시도해주세요.",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };