export const userColumnTitle=    () => [
    {
      accessorKey: 'username', //access nested data with dot notation
      header: 'Name',
    },
    {
      accessorKey: 'email', //normal accessorKey
      header: 'Email',
    },
    {
      accessorKey: 'createdAt',
      header: 'StartDate',
    },
  ]

  export const ReportDetails= () => [
    {
      accessorKey: 'reportedBy', //access nested data with dot notation
      header: 'Reported By',
    },
    {
      accessorKey: 'reason', //normal accessorKey
      header: 'Reason',
    },
    // {
    //   accessorKey: 'createdAt',
    //   header: 'Reported At',
    // },
    {
      accessorKey: 'totalReports',
      header: 'TotalReports ',
    }, 
  ]
  export const blockedUsers= () => [
    {
      accessorKey: 'firstname', //access nested data with dot notation
      header: 'Name',
    },
    {
      accessorKey: 'username', //normal accessorKey
      header: 'Email',
    }, 
    {
      accessorKey: 'updatedAt',
      header: 'blocked',
    }, 
  ]


