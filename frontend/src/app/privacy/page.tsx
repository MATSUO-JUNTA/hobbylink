import { Box, Container, Typography } from '@mui/material'

const fontStyle = { fontWeight: 'bold', mt: 2 }
const borderStyle = { borderBottom: '1px solid #A0A0A0', mt: 0.5, mb: 1 }

const Privacy = () => {
  return (
    <Container sx={{ mt: 3, mb: 11 }}>
      <Typography
        variant="body2"
        sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
      >
        プライバシーポリシー
      </Typography>

      <Typography variant="body2">
        本ウェブサイト上で提供するサービス「HobbyLink」（以下,「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
      </Typography>

      <Typography variant="body2" sx={fontStyle}>
        第1条（個人情報）
      </Typography>
      <Box sx={borderStyle} />
      <Typography variant="body2">
        「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし、特定の個人を識別できる情報（個人識別情報）を指します。
      </Typography>

      <Typography variant="body2" sx={fontStyle}>
        第2条（個人情報の収集方法）
      </Typography>
      <Box sx={borderStyle} />
      <Typography variant="body2">
        本サービスは、ユーザーが利用登録をする際に、Googleアカウント情報を取得します。
      </Typography>

      <Typography variant="body2" sx={fontStyle}>
        第3条（個人情報を収集・利用する目的）
      </Typography>
      <Box sx={borderStyle} />
      <Typography variant="body2" sx={{ mb: 1 }}>
        本サービスが個人情報を収集・利用する目的は，以下のとおりです。
      </Typography>
      <Typography variant="body2">1. 当社サービスの提供・運営のため</Typography>
      <Typography variant="body2">
        2. ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）
      </Typography>
      <Typography variant="body2">
        3. メンテナンス，重要なお知らせなど必要に応じたご連絡のため
      </Typography>
      <Typography variant="body2">
        4.
        利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため
      </Typography>
      <Typography variant="body2">
        5.
        ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
      </Typography>
      <Typography variant="body2">6. 上記の利用目的に付随する目的</Typography>

      <Typography variant="body2" sx={fontStyle}>
        第4条（利用目的の変更）
      </Typography>
      <Box sx={borderStyle} />
      <Typography variant="body2">
        1.
        本サービスは，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。
      </Typography>
      <Typography variant="body2">
        2.
        利用目的の変更を行った場合には，変更後の目的について，当社所定の方法により，ユーザーに通知し，または本ウェブサイト上に公表するものとします。
      </Typography>

      <Typography variant="body2" sx={fontStyle}>
        第5条（個人情報の第三者提供）
      </Typography>
      <Box sx={borderStyle} />
      <Typography variant="body2">
        本サービスは，ユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。
      </Typography>

      <Typography variant="body2" sx={fontStyle}>
        第6条（プライバシーポリシーの変更）
      </Typography>
      <Box sx={borderStyle} />
      <Typography variant="body2">
        1.
        本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。
      </Typography>
      <Typography variant="body2">
        2.
        本サービスが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。
      </Typography>
    </Container>
  )
}

export default Privacy
