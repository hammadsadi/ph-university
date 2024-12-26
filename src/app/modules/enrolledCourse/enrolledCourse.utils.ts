const calculateGradeAndPoints = (totgalMarks) => {
  let result = {
    grade: 'NA',
    gradePoints: 0,
  };

  // Check Point and Grade
  if (totgalMarks >= 0 && totgalMarks <= 19) {
    result = {
      grade: 'F',
      gradePoints: 0,
    };
  } else if (totgalMarks >= 20 && totgalMarks <= 39) {
    result = {
      grade: 'D',
      gradePoints: 2.0,
    };
  } else if (totgalMarks >= 40 && totgalMarks <= 59) {
    result = {
      grade: 'C',
      gradePoints: 3.0,
    };
  } else if (totgalMarks >= 60 && totgalMarks <= 79) {
    result = {
      grade: 'B',
      gradePoints: 3.5,
    };
  } else if (totgalMarks >= 80 && totgalMarks <= 100) {
    result = {
      grade: 'A',
      gradePoints: 4.0,
    };
  } else {
    result = {
      grade: 'NA',
      gradePoints: 0,
    };
  }

  return result;
};
