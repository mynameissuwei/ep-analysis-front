import request from '@/utils/request'

export function discoverProcess(data) {
  return request({
    url: '/log/discoverProcess',
    method: 'post',
    data
  })
}
