INSERT INTO address_code (
  addresscode,
  provcode,
  provname,
  distcode,
  distname,
  subdistcode,
  subdistname,
  area,
  areacode,
  zipcode
) VALUES (
  '',
  'draft data',
  'draft data',
  'draft data',
  'draft data',
  'draft data',
  'draft data',
  'draft data',
  'draft data',
  'draft data'
);

INSERT INTO address (
  hcode,
  hcode_hdc,
  hno,
  village,
  street,
  moo,
  villcode
) VALUES (
  '',
  '',
  'draft data',
  'draft data',
  'draft data',
  'draft data',
  ''
);

INSERT INTO guardian (
  guardian_id,
  relationships,
  idcard,
  title,
  first_name,
  last_name,
  birth,
  phone,
  hcode
) VALUES (
  '',
  '01',
  'draft data',
  '01',
  'draft data',
  'draft data',
  '1970-05-15',
  'draft data',
  ''
);

INSERT INTO title_normalize (title_id, title_th, title_en)
VALUES 
  ('01', 'นาย', 'Mr.'),
  ('02', 'นาง', 'Mrs.'),
  ('03', 'นางสาว', 'Miss'),
  ('04', 'เด็กชาย', 'Master'),
  ('05', 'เด็กหญิง', 'Miss');

INSERT INTO relationship (relationship_id,relationship_th,relationship_en) VALUES
 ('01','บิดา','Father'),
 ('02','มารดา','Mother'),
 ('03','บูตร','Child'),
 ('04','พี่น้อง','Sibling'),
 ('05','คู่สมรส','Spouse'),
 ('06','ญาติ','Relative'),
 ('07','เพื่อน','Friend'),
 ('08','ผู้ดูแล','Caretaker');