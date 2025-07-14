const mergeServiceData = (templatePlans, serviceData) => {
  const idToPackageName = {
    basic: 'Cơ Bản',
    professional: 'Chuyên Nghiệp',
    premium: 'Cao Cấp',
  };

  return templatePlans.map((template) => {
    const matchedService = serviceData.find(
      (service) => service.packageName === idToPackageName[template.id],
    );

    return matchedService
      ? {
          ...template,
          price: matchedService.pricePerPair.toLocaleString('vi-VN'),
          originalPrice: Math.round(matchedService.pricePerPair * 1.25).toLocaleString('vi-VN'),
          description: matchedService.description,
          packageID: matchedService.packageID,
        }
      : template;
  });
};

export default mergeServiceData;
