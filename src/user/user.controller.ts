import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateBookDto, ResponseBookDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedInGuard } from 'src/oauth/logged-in.guard';

@ApiTags('Users')
@ApiResponse({
  description: 'check data type again',
  status: 400,
  schema: {
    example: {
      success: false,
      code: 400,
      data: [
        'walkingLeg2 must be a number conforming to the specified constraints',
      ],
    },
  },
})
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('jwt')
  @ApiHeader({
    name: 'Authorization',
    description: 'eyJhGcioJ와 같은 accessToken',
  })
  @ApiResponse({
    status: 401,
    description: '토큰 시간 초과, 잘못된 유저 등 모든 로그인 실패... ',
    schema: {
      example: {
        success: false,
        code: 401,
        data: 'unauthorized error',
      },
    },
  })
  @ApiResponse({
    description: 'unknown error',
    status: 404,
    schema: {
      example: { success: false, code: 404, data: 'unknown error' },
    },
  })
  @ApiResponse({
    description:
      '유저가 존재하지 않는 잘못된 유저인 경우, 로그인 과정 재시도 필요',
    status: 406,
    schema: {
      example: {
        success: false,
        code: 406,
        data: 'user is not found',
      },
    },
  })
  @ApiOperation({
    summary: '로그인 되어 있는 유저에 도감을 등록한다',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: {
      example: {
        result: true,
      },
    },
  })
  @Post('book')
  async create(
    @Body() createUserDto: CreateBookDto,
    @Headers('Authorization') token: any,
  ) {
    return await this.userService.create(createUserDto, token);
  }

  @ApiBearerAuth('jwt')
  @ApiHeader({
    name: 'Authorization',
    description: 'eyJhGcioJ와 같은 accessToken',
  })
  @ApiResponse({
    status: 401,
    description: '토큰 시간 초과, 잘못된 유저 등 모든 로그인 실패... ',
    schema: {
      example: {
        success: false,
        code: 401,
        data: 'unauthorized error',
      },
    },
  })
  @ApiResponse({
    description: 'unknown error',
    status: 404,
    schema: {
      example: { success: false, code: 404, data: 'unknown error' },
    },
  })
  @ApiOperation({
    summary: '로그인 되어 있는 유저에 대한 모든 도감 데이터를 가져온다',
  })
  @ApiResponse({
    status: 200,
    description:
      'result는 요청의 성공 여부를 담고 있다\t\ncount는 총 도감 수를 담는다\t\nbookList는 도감각각의 코드를 담는다',
    schema: {
      description:
        'result는 요청의 성공 여부를 담고 있다\t\ncount는 총 도감 수를 담는다\t\nbookList는 도감각각의 코드를 담는다',
      example: {
        result: true,
        count: 1,
        bookList: [
          {
            eye: 3,
            mouth: 3,
            arm: 3,
            body: 3,
            horn: 3,
            ear: 3,
            leg: 3,
            tail: 3,
          },
        ],
      },
    },
  })
  @ApiResponse({
    description: '가져오기 성공',
    status: 200,
    schema: {
      example: [
        [
          [
            {
              id: 1,
              eye: 3,
              arm: 3,
              body: 3,
              horn: 3,
              ear: 3,
              leg: 3,
              tail: 3,
              pattern: 3,
              walkingLeg1: 3,
              walkingLeg2: 3,
            },
            {
              id: 3,
              eye: 3,
              arm: 3,
              body: 3,
              horn: 3,
              ear: 3,
              leg: 3,
              tail: 3,
              pattern: 3,
              walkingLeg1: 3,
              walkingLeg2: 3,
            },
          ],
          2,
        ],
      ],
    },
  })
  @Get('book')
  async findAll(@Headers('Authorization') token: any) {
    return await this.userService.findAll(token);
  }

  @ApiOperation({ summary: 'return db_username secret' })
  @Get('test')
  findTest() {
    return this.userService.test();
  }

  @ApiBearerAuth('jwt')
  @ApiHeader({
    name: 'Authorization',
    description: 'eyJhGcioJ와 같은 accessToken',
  })
  @ApiResponse({
    status: 401,
    description: '토큰 시간 초과, 잘못된 유저 등 모든 로그인 실패... ',
    schema: {
      example: {
        success: false,
        code: 401,
        data: 'unauthorized error',
      },
    },
  })
  @ApiResponse({
    description: 'unknown error',
    status: 404,
    schema: {
      example: { success: false, code: 404, data: 'unknown error' },
    },
  })
  @ApiOperation({ summary: '유저 프로필 정보 조회' })
  @ApiResponse({
    status: 200,
    description: '가져오기 성공 point는 미래를 위한 db세팅',
    schema: {
      example: {
        Nick: 'testing',
        point: 0,
      },
    },
  })
  @Get()
  async findUser(@Headers('Authorization') token: any) {
    return await this.userService.findUser(token);
  }

  @ApiOperation({ summary: '랜덤 유저 프로필 생성기' })
  @ApiResponse({
    status: 200,
    description: '닉네임, 코드 랜덤 배정. 범위는 합의 필요',
    schema: {
      example: {
        Nick: '테스팅용 랜덤55',
        code: {
          eye: 3,
          mouth: 3,
          arm: 3,
          body: 3,
          horn: 3,
          ear: 3,
          leg: 3,
          tail: 3,
          pattern: 3,
          walkingLeg1: 3,
          walkingLeg2: 3,
        },
      },
    },
  })
  @Get('/random')
  async getRandom() {
    return await this.userService.randomNick();
  }

  @ApiBearerAuth('jwt')
  @ApiHeader({
    name: 'Authorization',
    description: 'eyJhGcioJ와 같은 accessToken',
  })
  @ApiResponse({
    status: 401,
    description: '토큰 시간 초과, 잘못된 유저 등 모든 로그인 실패... ',
    schema: {
      example: {
        success: false,
        code: 401,
        data: 'unauthorized error',
      },
    },
  })
  @ApiBody({
    description: 'body',
    schema: {
      example: {
        Nick: 'test용 닉네임 1234',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    schema: {
      example: {
        result: true,
        Nick: '변화된 닉네임',
      },
    },
  })
  @ApiOperation({ summary: '닉네임 저장하기' })
  @Put('/nick')
  async patchNick(
    @Headers('Authorization') token: any,
    @Body('Nick') body: string,
  ) {
    return await this.userService.patchUser(token, body);
  }
}
