const mergeServiceData = (templatePlans, serviceData) => {
  return templatePlans.map((template) => {
    const matchedService = serviceData.find((service) => service.packageName === template.title);

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
