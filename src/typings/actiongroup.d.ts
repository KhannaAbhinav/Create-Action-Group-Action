export interface ActionGroup {
  inputs?: [
    {
      [key: string]: string
    }
  ]
  steps: {
    id?: string
    if?: string
    name: string
    uses?: string
    run?: string
    with?:
      | [
          {
            [key: string]: string
          }
        ]
      | {
          args?: string[]
          entrypoint?: string
        }
    env?: [
      {
        [key: string]: string
      }
    ]
    'continue-on-error'?: string
    'timeout-minutes'?: string
  }
  outputs?: [
    {
      [key: string]: string
    }
  ]
}
