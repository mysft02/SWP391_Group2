const competitions = [
    {
      competition_id: 1,
      competition_name: "Koi Competition Spring 2024",
      category_id: 1,
      koi_id: 2024,
      status_competition: "active"
    },
    {
      competition_id: 2,
      competition_name: "Autumn Koi Showcase",
      category_id: 2,
      koi_id: 2025,
      status_competition: "scheduled"
    }
  ];
  
  const categories = [
    { category_id: 1, category_name: "A", standard_id: 1 },
    { category_id: 2, category_name: "B", standard_id: 2 }
  ];
  
  const koistandards = [
    {
      standard_id: 1,
      color_koi: "Red",
      pattern_koi: "Pattern1",
      size_koi: "Small",
      age_koi: 2,
      bodyshape_koi: "Oval",
      variety_koi: "Variety1",
      standard_name: "Standard1",
      gender: "Male"
    },
    {
      standard_id: 2,
      color_koi: "Blue",
      pattern_koi: "Pattern2",
      size_koi: "Medium",
      age_koi: 3,
      bodyshape_koi: "Round",
      variety_koi: "Variety2",
      standard_name: "Standard2",
      gender: "Female"
    }
  ];
  
  // Kết hợp dữ liệu
  const combinedData = competitions.map(comp => {
    const category = categories.find(c => c.category_id === comp.category_id);
    const standard = koistandards.find(s => s.standard_id === category.standard_id);
    return {
      ...comp,
      category_name: category.category_name,
      color_koi: standard.color_koi,
      pattern_koi: standard.pattern_koi,
      size_koi: standard.size_koi,
      age_koi: standard.age_koi,
      bodyshape_koi: standard.bodyshape_koi,
      variety_koi: standard.variety_koi,
      gender: standard.gender
    };
  });
  
  console.log(combinedData);
  