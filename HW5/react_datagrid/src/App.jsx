import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Typography, Box, TextField } from '@mui/material';

// 定義 DataGrid 的欄位 (對應原本的 名稱、地點、票價)
const columns = [
  { field: 'title', headerName: '名稱', width: 400 },
  { field: 'location', headerName: '地點', width: 300 },
  { field: 'price', headerName: '票價', width: 200 },
];

function App() {
  const [rows, setRows] = useState([]);      // 原始資料
  const [searchText, setSearchText] = useState(''); // 搜尋文字

  // 使用 useEffect 呼叫 API (類似 Hw4 的資料來源)
  useEffect(() => {
    // 這裡使用文化部或政府開放資料的 API 範例路徑
    // 提示：你可以換成你 Hw4 實際使用的 API 網址
    const apiURL = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';
    
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        // DataGrid 需要每一列都有一個唯一的 'id'
        // 如果 API 沒有提供 id，我們手動用 index 當作 id
        const formattedData = data.map((item, index) => ({
          id: index,
          title: item.title,
          location: item.showInfo[0]?.locationName || '無資訊',
          price: item.showInfo[0]?.price || '免費/無資訊',
        }));
        setRows(formattedData);
      })
      .catch((error) => console.error('API Error:', error));
  }, []);

  // 處理搜尋過濾
  const filteredRows = rows.filter((row) => {
    return row.title.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          景點觀光展覽資訊 (Hw5 - DataGrid 版)
        </Typography>

        {/* 搜尋框：取代原本的 HTML input */}
        <TextField
          label="名稱搜尋..."
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* DataGrid：取代原本的 <table> 與分頁按鈕 */}
        <div style={{ height: 600, width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection
            disableSelectionOnClick
            // 讓 DataGrid 顯得更專業的設定
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default App;